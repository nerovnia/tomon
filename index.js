const mongoose = require("mongoose");
const fs = require('fs');

const fjsondbauth = "./dbauth.json";

const dbauth = JSON.parse(fs.readFileSync(fjsondbauth, 'utf8'));

console.log(dbauth.login, dbauth.password);


//mongoose.connect("mongodb://root:example@localhost:27017/uz", {user:'root', pass:'example', useNewUrlParser: true,useUnifiedTopology:true, authSource: "admin"});
mongoose.connect("mongodb://root:example@localhost:27017/uz", {user:dbauth.user, pass:dbauth.password, useNewUrlParser: true,useUnifiedTopology:true, authSource: "admin"});

const Schema = mongoose.Schema;
const cowokerScheme = new Schema({
      fname: String,
      mname: String,
      oname: String,
      ws: String,
      bd: String,
      op: Number,
      ph: [
        String
      ]
});

const cowokersScheme = new Schema({
      cowokers: [cowokerScheme]
});

const Cowokers = mongoose.model("Cowokers", cowokersScheme);

fs.readFile("./export/ph.json", (err, data) => {
  if (err) throw err;
  let obj = JSON.parse(data);
  //console.log(obj);
  cowokers = new Cowokers();
  cowokers.cowokers = obj.cowokers;
  cowokers.save(function(err){
    mongoose.disconnect();  // отключение от базы данных
      
    if(err) return console.log(err);
    console.log("Сохранен объект");
  });




});

  


