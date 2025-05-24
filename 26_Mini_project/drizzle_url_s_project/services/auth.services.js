import { ACCESS_TOKEN_EXPIRY, MILLISECONDS_PER_SECOND, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";

import { and, eq, gte, lt, sql } from "drizzle-orm"; // Service for users for all import bellow
import { db } from "../config/db.js";
import { sessionsTable, usersTable, shortLinksTable, verifyEmailTokensTable } from "../drizzle/schema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from 'crypto';


export const getUserByEmail = async (email) => { // Get using "email" field
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return user;
};


export const createUser = async ({ name, email, password }) => {
  return await db
    .insert(usersTable)
    .values({ name, email, password })
    .$returningId();
};


export const hashPassword = async (password) => {  // for Hashing password (video : 78)
  return await argon2.hash(password);
};


export const comparePassword = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};

// For JWT authentication (vide : 79)
// export const generateToken = ({ id, name, email }) => {
//   return jwt.sign({ id, name, email }, process.env.JWT_SECRET, { // jwt.sign() return JSON Web Token(JWT) "String"
//     expiresIn: "30d",
//   });
// };

export const createSession = async ( userId, { ip, userAgent }) => {  // video 91. insert data on sessionsTable
  const [session] = await db
    .insert(sessionsTable)
    .values({userId, ip, userAgent})
    .$returningId();
  return session;
}


export const createAccessToken = ({ id, name, email, sessionId }) => {
  return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //   expiresIn: "15m",
  });
};


export const createRefreshToken = (sessionId) => {
  return jwt.sign({ sessionId }, process.env.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //   expiresIn: "1w",
  });
};


export const verifyJWTToken = (token) => { // Video 80: Verify JWT Token in Node.js: secure authenticaton with middleware
  return jwt.verify(token, process.env.JWT_SECRET);
}


export const findSessionById = async (sessionId) => {
  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, sessionId)); // ✅ FIXED

  return session;
};


export const findUserById = async (userId) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  return user;
}


export const refreshTokens = async (refreshToken) => {  // video 90
  try {
    const decodedToken = verifyJWTToken(refreshToken);
    const currentSession = await findSessionById(decodedToken.sessionId);

    if ( !currentSession || !currentSession.valid ) {
      throw new Error("Invalid Session");
    }

    const user = await findUserById(currentSession.userId);
    if (!user) throw new Error("Invalid User");
    
    const userInfo = {
      id           : user.id,
      name         : user.name,
      email        : user.email,
      isEmailValid : false,        // video 97
      sessionId    : currentSession.id,
    }

    const newAccessToken =  createAccessToken(userInfo);
    const newRefreshToken =  createRefreshToken(currentSession.id);

    return {
      newAccessToken, 
      newRefreshToken, 
      user:userInfo,
    }

  } catch (error) {
    // console.log(error.message);
    throw new Error("Token refresh failed: " + error.message);
  }
}


export const clearUserSession = async (sessionId) => {  // video 93
  return await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}


export const authenticateUser = async ({req, res, user, name, email}) => {
  const session = await createSession(user.id, { // video 91. we need to createSessions, createAccessToken, createRefreshTokan
        ip: req.clientIp,
        userAgent: req.headers["user-agent"],
      });
   
      const accessToken = createAccessToken({ // video 94. this copy from postLogin()
        id           : user.id,
        name         : user.name  || name,
        email        : user.email || email,
        isEmailValid : false,                   // video 97
        sessionId    : session.id,
      });
  
      const refreshToken = createRefreshToken(session.id);
  
      const baseConfig = { httpOnly: true, secure: true };
  
      res.cookie("access_token", accessToken, {
        ...baseConfig,
        maxAge: ACCESS_TOKEN_EXPIRY,
      });
  
      res.cookie("refresh_token", refreshToken, {
        ...baseConfig,
        maxAge: REFRESH_TOKEN_EXPIRY,
      });
}


export const getAllShortLinks = async (userId) => {                  // video 96
  return await db.select().from(shortLinksTable).where(eq(shortLinksTable.userId, userId));
}

 
export const generateRandomToken = (digit = 8) => {
  const min = 10 ** (digit - 1);
  const max = 10 ** (digit);
  return crypto.randomInt(min, max).toString();
}


export const insertVerifyEmailToken = async ({ userId, token }) => {  // video 101
  console.log("\nGenerating email...");
  return db.transaction(async (tx) => {                               // video 103. DBMS transaction & How to use "transation"
    try {
      await tx
        .delete(verifyEmailTokensTable)
        .where(lt(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`));

      // Delete any existing tokens for this specific user
      await tx
        .delete(verifyEmailTokensTable)
        .where(eq(verifyEmailTokensTable.userId, userId));

      await tx.insert(verifyEmailTokensTable).values({ userId, token });

    } catch (error) {
      console.error("\nFailed to insert verifiaction token: ", error);
      throw new Error("Unale to create verifiaction token\n");      
    }
  });
};


export const createVerifyEmailLink = async ({email, token}) => {      // video 101
  const url = new URL(`${process.env.FRONTEND_URL}/verify-email-token`); // video 104. URL api
  url.searchParams.append('token', token);
  url.searchParams.append('email', email);
  return url.toString();
}


export const findVerificationEmailToken = async ({email, token}) => { // video 105
  const tokenData = await db
    .select({
      userId    : verifyEmailTokensTable.userId,
      token     : verifyEmailTokensTable.token,
      expiresAt : verifyEmailTokensTable.expiresAt,
    })
    .from(verifyEmailTokensTable)
    .where(
      and(
        eq(verifyEmailTokensTable.token, token), 
        gte(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`)
      )
    )
  if (!tokenData.length) {
    return null;
  }
  const { userId } = tokenData[0];


  const userData = await db
    .select({
      userId: usersTable.id,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));
  if (!userData.length) {
    return null;
  }
  return {
    userId   : userData[0].userId,
    email    : userData[0].email,
    token    : tokenData[0].token,
    expiresAt: tokenData[0].expiresAt,
  };
};


export const verifyUserEmailAndUpdate = async (email) => { // video 105
  return db
  .update(usersTable)
  .set({ isEmailValid: true })
  .where(eq(usersTable.email, email));
}


export const clearVerifyEmailTokens = async (userId) => { // video 105
  return await db
    .delete(verifyEmailTokensTable)
    .where(eq(verifyEmailTokensTable.userId, userId))
}