const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const cors = require("cors");
const validar = require("./validate");
const myconnection = require("express-myconnection");

const app = express();
app.use(cors());
app.use(express.json());

// dbOptions = {
//   user: "sql10502527",
//   password: "rtNQag8BcH",
//   host: "sql10.freemysqlhosting.net",
//   database: "sql10502527",
//   Port: 3306,
// };

dbOptions = {
  user: "root",
  password: "root",
  host: "localhost",
  database: "newtech",
};

app.use(myconnection(mysql, dbOptions, "single"));

app.get("/", (req, res) => {
  const data = fs.readFileSync("./datos.json",{ encoding: 'utf-8' })
  console.log(data);
  req.getConnection((err,connection)=>{
      if(err) res.send(err);
      connection.query(`SELECT * FROM user`,
      (err,result)=>{
        if(err) throw error
        res.send((result))
      })
  }) 
});

app.post("/enviar", (req, res) => {
  const { name, lastName, email, country, comments } = req.body;
  const pass = validar(name, lastName, email, country, comments);
  if (Object.keys(pass).length === 0) {
    fs.writeFileSync(
      "./datos.json",
      JSON.stringify({ name, lastName, email, country, comments }, "utf-8")
    );
    req.getConnection((error, connection) => {
      if (error) console.log(error);
      connection.query(
        `INSERT INTO user (name, lastname, email,country, comment) VALUES("${name}", "${lastName}", '${email}', "${country}" ,"${comments}")`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    });
  } else {
    res.send(pass);
  }
});

app.listen(4000, () => {
  console.log("Server corriendo en el puerto 4000");
});
