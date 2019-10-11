const express = require('express');
const Database = require('./database.js');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
var Athlete = require('./model/athlete.js');

const connection = new Database();
const app = express();
const port = 8080;

var cors = require('cors');

// CORS-middlewaren käyttöönotto
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  
  if(req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
   return res.status(200).json({});
  }
  next();
});
// Sallitaan pääsy selaimen tarvitsemiin tiedostoihin
app.use(express.static(__dirname+'/client')); 


app.get("/", (req, res) => {
  res.send("homepage");
})

/*app.get('/api/v1/athletes', (req, res) => {
  Athlete.find({}, (err, athletes) => {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Kaikki urheilijat......");
      console.log(athletes);
      res.send(athletes);
    }
  }).sort('date').exec(function(err, docs){

  });
});*/

app.get("/api/v1/athletes", (req, res) => {
  Athlete.find({}).sort({birth: +1}).exec(function(err, athletes) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Kaikki urheilijat......");
      console.log(athletes);
      res.send(athletes);
    }
  });
})

app.post("/", (req, res) => {
  var urheilija = new Athlete({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    weight: req.body.weight,
    birth: req.body.birth,
    img: req.body.img,
    sports: req.body.sports,
    stats: req.body.stats
  })
  urheilija.save()
    .then(() => {
    res.redirect("/");
  })
    .catch(err => {
    res.status(400).send("unable to save to database");
  });
 });

/*app.post("/", (req,res) => {
  var urheilija = new Athlete({
    firstname: req.params.body.firstname,
    lastname: req.params.body.lastname,
    weight: req.params.weight,
    birth: req.params.birth,
    img: req.params.img,
    sports: req.params.sports,
    stats: req.params.stats
  })
  Athlete.save()
})*/

/*
  console.log("GET /api/v1/athletes");
  res.send("TODO: tee kysely tietokantaan")
  connection.getAll(function(athletes){
    res.send(athletes);
  })*/

app.get('/TODO/vaihda/URI/tahan/', (req, res) => {
  console.log("GET /TODO/vaihda/URI/tahan/");
  console.log("eli client.js vaatii muutoksia...");
  res.send("editoi tarvittava REST-resurssi client.js-tiedostoon");
})

app.listen(3000, "localhost", () => {
  console.log("listening to port 3000");
})

//app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`));