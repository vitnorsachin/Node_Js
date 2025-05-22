import { ACCESS_TOKEN_EXPIRY, MILLISECONDS_PER_SECOND, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";

import { eq } from "drizzle-orm"; // Service for users for all import bellow
import { db } from "../config/db.js";
import { sessionsTable, usersTable, shortLinksTable } from "../drizzle/schema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


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
    console.log(error.message);
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


export const getAllShortLinks = async (userId) => { // video 96
  return await db.select().from(shortLinksTable).where(eq(shortLinksTable.userId, userId));
}