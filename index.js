const { faker } = require('@faker-js/faker');
const mysql= require("mysql2");
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true })); // Handles form submissions
app.use(express.json()); // Handles JSON payloads
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sds_app',
    password:'Swarnadip@321'
  });


  // INSERT DATA BY FAKER-------


let  getRandomUser = () =>{
  return [
   faker.string.uuid(),
     faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    //faker.image.avatar(),
   faker.internet.password(),
   //  faker.date.birthdate(),
   
  ];
}
/* let q= "INSERT INTO user (id, username,email,password) VALUES ?;";
  let data=[];

  for(let i=1; i<=100; i++){

    data.push(getRandomUser());   //100 fake user.
  
  } */

/*   try{
    connection.query(q,[data], (err, result)=>{

        if(err) throw (err);
       console.log(result);
    
    });
  }catch(err){
    console.log(err);
  }
  
  connection.end(); */
  
  //INSERT DATA MANUALLY----------

/* let q= "INSERT INTO user (id, username,email,password) VALUES ?;";
let users=[["acb11","swarna2", "swarna2@gmail.com","ssss2"],
              ["abc2","ankur","ankur@gmail.com","aaaaa"]];

  try{
    connection.query(q,[users], (err, result)=>{

        if(err) throw (err);
       console.log(result);
    
    });
  }catch(err){
    console.log(err);
  }

  connection.end();
 */

//console.log(getRandomUser());

//home--
app.get("/", (req,res)=>{
let q=`SELECT COUNT(*) FROM user`;
  try{
    connection.query(q, (err, result)=>{

        if(err) throw (err);
        let r=result[0]["COUNT(*)"];
        res.render("home.ejs",{r});
       //console.log(result[0]["COUNT(*)"]);
    
    });
  }catch(err){
    console.log(err);
    res.send("there is some error!");
  }
 // res.send("working!");
});



// add user---------------
app.get("/add",(req,res)=>{
  res.render("add.ejs");
});

app.post("/",(req,res)=>{
  let id=uuidv4();
  let {username:usernamef,email:emailf,password:passwordf}=req.body;

  let q=`INSERT INTO user (id, username,email,password) VALUES ('${id}','${usernamef}','${emailf}','${passwordf}');`;
  try{
    connection.query(q, (err, result)=>{

        if(err) throw (err);
       
       res.redirect("/user");
    
    });
  }catch(err){
    console.log(err);
    res.send("there is some error!");
  }
 // res.send("working!");
});

app.get("/users",(req,res)=>{
  res.redirect("/user");
})







//show users---

app.get("/user",(req,res)=>{
 

  let q= `SELECT * FROM user`;

  try{
    connection.query(q, (err, users)=>{

        if(err) throw (err);
       // console.log(result);
       //let {id,username,email}=user;
      
      res.render("users.ejs",{users} );
    
    });
  }catch(err){
    console.log(err);
    res.send("there is some error!");
  }
 // res.send("working!");

});


app.get("/user/home",(req,res)=>{

  res.redirect("/");


});


//edit route-----------

app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  

  q=`SELECT * FROM user WHERE id='${id}'`;

  

  try{
    connection.query(q, (err, result)=>{

        if(err) throw (err);
       // console.log(result);
       //let {id,username,email}=user;
      //console.log(result);
      res.render("edit.ejs",{user:result[0]});
    
    });
  }catch(err){
    console.log(err);
    res.send("there is some error!");
  }


});

//update route---

app.patch("/user/:id",(req,res)=>{

  let {id}=req.params;
  let { password:formPass,username:newUsername }=req.body;

  q=`SELECT * FROM user WHERE id='${id}'`;

  

  try{
    connection.query(q, (err, result)=>{

        if(err) throw (err);
        let user=result[0];
        if(formPass!=user.password){
          res.send("Wrong Password!");
        }
        else{

          q2=`UPDATE user SET username='${newUsername}' where id= '${id}'`;

          
  try{
    connection.query(q2, (err, result)=>{

        if(err) throw (err);
       // console.log(result);
      
       res.redirect("/user");
        
    });
  }catch(err){
    console.log(err);
    res.send("there is some error!");
  }
        }

            console.log(formPass);
       // console.log(result);
       //let {id,username,email}=user;
      //console.log(result);
      
    
    });
  }catch(err){
    console.log(err);
    res.send("there is some error!");
  }



});


// ----------------------------------Delete user----------------------------

app.get("/user/:id/delete",(req,res)=>{

  let {id}= req.params;
  let q=`SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q, (err, result)=>{

        if(err) throw (err);
       // console.log(result);
       //let {id,username,email}=user;
      //console.log(result);
      res.render("delete.ejs",{user:result[0]});
    
    });
  }catch(err){
    console.log(err);
    res.send("there is some error!");
  }


});

app.delete("/user/:id",(req,res)=>{

  let {id}=req.params;
  let { password:formPass,email:formEmail }=req.body;

  q=`SELECT * FROM user WHERE id='${id}'`;

  try{
    connection.query(q, (err, result)=>{

        if(err) throw (err);
        let user=result[0];
        if(formPass!=user.password && formEmail!=user.email){
          res.send("wrong");
        }
        else{
          q2=`DELETE FROM user WHERE id='${id}'`
          try{
            connection.query(q2, (err, result)=>{
        
                if(err) throw (err);
               res.redirect("/user")
              
            
            });
          }catch(err){
            console.log(err);
            res.send("there is some error!");
          }

        }




      
    
    });
  }catch(err){
    console.log(err);
    res.send("there is some error!");
  }

});


  app. listen("8000", ()=>{

    console.log("listening to port :8000 ");
  });