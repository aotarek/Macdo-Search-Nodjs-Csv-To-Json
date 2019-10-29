const express = require('express');
const csvToJson = require('csvtojson');
const bodyParser = require('body-parser');
var uniqid = require('uniqid');
const { clipByCharacter } = require('./helpers/helpers');

const v1 = require('./routes/v1');

global.listMacdonadl = [];

csvToJson({
  quote: '',
  delimiter: ',"',
  noheader: true,
  output: 'json'
})
  .fromFile('./data/mcdonalds.csv')
  .subscribe(json => {
    let { field1, field2, field3 } = json;
    let [longitude, lattitude] = clipByCharacter(field1, ',');
    let [address, city, country, phone] = clipByCharacter(field3, ',');
    let structureOjbect = {
      uid: uniqid(),
      lattitude: lattitude,
      longitude: longitude,
      name: field2.replace(/["]/gi, ''),
      address: address,
      city: city,
      country: country,
      phone: phone
    };
    global.listMacdonadl.push(structureOjbect);
  });

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/api/v1', v1);

app.listen(5000, () => console.log('Server Started...'));
