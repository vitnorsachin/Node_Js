// step 7. crud operation
import { eq } from "drizzle-orm";
import { db } from "./config/db.js";
import { usersTable } from "./drizzle/schema.js";

const main = async () => {
  // 1️⃣. Insert
  // Single user
  // const insertUser = await db.insert(usersTable).values(
  //   {name: "praksh",age: "29",email: "prakash@gmail.com"});
  // console.log(insertUser);
  // Multiple user
  // const insertUsers = await db.insert(usersTable).values([
  //   { name: "sachin", age: "23", email: "sachin@gmail.com" },
  //   { name: "sarla", age: "23", email: "sarla@gmail.com" },
  // ]);
  // console.log(insertUsers);

  // 2️⃣. Read
  // Read all
  // const users = await db.select().from(usersTable);
  // console.log(users);
  // Read based on condition
  // const user = await db.select().from(usersTable).where({email:"sarla@gmail.com"});
  // console.log(user);

  // 3️⃣. Update
  // const updateUser = await db
  //   .update(usersTable)
  //   .set({ name: "sachin vitnor", email:"vitnorsachin@gmail.com" })
  //   .where(eq(usersTable.email, "sachin@gmail.com"));
  // console.log(updateUser);

  // 4️⃣. Delete
  const deleteUser = await db.delete(usersTable).where(eq(usersTable.id, 6));
};

main().catch((error) => {
  console.log(error);
});