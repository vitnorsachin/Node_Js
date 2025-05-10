import { PrismaClient } from "./generated/prisma/index.js";
const prisma = new PrismaClient();

const main = async () => {

  // 1️⃣. Insert single user
  const user = await prisma.user.create({
    data: {
      name: "prakash",
      email: "prakash@gmail.com",
    },
  });
  console.log(user);



  // 2️⃣. Insert Many User
  // const users = await prisma.user.createMany({
  //   data: [
  //     {name: "sachin",email: "sachin@gmail.com"},
  //     {name: "sarla",email: "sarla@gmail.com"},
  //   ],
  // });
  // console.log(users);



  // 3️⃣. Read (Fetch Data)
  // ✅ Get all user data
  // const user = await prisma.user.findMany();
  // console.log(user);
  // ✅ Get single user
  // const user = await prisma.user.findUnique({ where: { email: 'mahesh@gmail.com' } }); // only uniqe string like {id & email}
  // console.log(user);
  // ✅ filter
  // const user = await prisma.user.findMany({ where: { name: 'sachin' } });
  // console.log(user);



  // 4️⃣. Update user
  // ✅ Update one data
  // const updatedUser = await prisma.user.update({
  //   where: { id: 2 },
  //   data: { name:'sarla', email: "sarla@gmail.com" },
  // });
  // console.log(updatedUser);
  // ✅ Update many data
  // const updatedUser = await prisma.user.update({// when have condition match
  //   where: { email: "ganesh@gmail.com" },
  //   data: { name: "sagar", email: "sagartupe@gmail.com" },
  // });
  // console.log(updatedUser);



  // 5️⃣. Delete
  // ✅ Delete one user
  // const deleteUser = await prisma.user.delete({
  //   where: { id: 2 },
  // });
  // console.log(deleteUser);
  // ✅ Delete many user
  // const deleteUsers = await prisma.user.deleteMany({
  //   where: [{ id: 2 }, { id: 1 }],
  // });
  // console.log(deleteUsers);
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });