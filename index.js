const mongoose = require("mongoose");
const fs = require('fs');

const fjsondbauth = "./dbauth.json";
const fexport = "./export/export.json";

const dbauth = JSON.parse(fs.readFileSync(fjsondbauth, 'utf8'));
const exportModels = JSON.parse(fs.readFileSync(fexport, 'utf8'));
mongoose.connect(dbauth.uri, {user: dbauth.login, pass: dbauth.password, useNewUrlParser: true,useUnifiedTopology:true, authSource: "admin"});

exportModels.models.forEach(model => {
  let dbmodel = require('./'+exportModels.ptomodel + model.model).Model();
  fs.readFile(exportModels.ptodata + model.expfile + '.json', (err, data) => {
    if (err) throw err;
    let obj = JSON.parse(data);
    dbmodel.objdata = obj.objdata;
    dbmodel.save(function (err) {
      mongoose.disconnect();
      if (err) return console.log(err);
      console.log('Export data is complite!');
    });
  });
});


