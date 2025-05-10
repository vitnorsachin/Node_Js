import mysql from "mysql2/promise";


// 1️⃣. to connect to mysql server
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 5000,
  database: "mysql_db"
});
console.log("\nMySQL Connected Successfully ✅");


// 2️⃣. we need to create a db
// await db.execute(`CREATE DATABASE mysql_db`);
// console.log(await db.execute(`show databases`));


// 3️⃣. create a table
// await db.execute(`
//   CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE
//   );`);




// 4️⃣. Perform CRUD operation

// 🅰️. Create Data (Insert Data)
// // ✅ Using Prepared Statements (Best Practice)
// await db.execute(`INSERT INTO users(id, username, email) VALUES(?,?,?)`,
//   ["4", "gendfool", "genda@gmail.com" ]
// );

// const values = [
//   ["Alice", "alice@gmail.com"],
//   ["Bob", "bob@gmail.com"],
//   ["Charlie", "charlie@gmail.com"],
//   ["David", "david@example.com"],
//   ["Ema", "ema@gmail.com"],
// ];
// await db.query(`INSERT INTO users(username, email) VALUES ?`,[values]);




// 😛. Update Data
// // ✅ Using Prepared Statements (Best Practice)
try {
  await db.execute(`UPDATE users SET username= ?, email= ? WHERE email= ?`,
    ['sachin', 'sachin@gmail.com', 'vinod@gmail.com'] 
  )  
} catch (error) {
  console.error(error);
}




// 🤨. Delete table data
try {
  await db.execute(`DELETE FROM users WHERE email="ema@gmail.com"`);
} catch (error) {
  console.error(error);
}



// 🅱️. Read Data
// // It show all rows
const [rows] = await db.execute(`SELECT * FROM users;`);
console.log(rows);

// // It show row if condition is match
// const [row] = await db.execute(`SELECT * FROM users WHERE username="sachin"`);
// console.log(row); 