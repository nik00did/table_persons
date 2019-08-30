const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const converters = require('./converters');
const {
    convertToCSV,
    convertToYaml,
    convertToXML,
    convertToJSON
} = converters;

const jsonParser = bodyParser.json();

app.use(express.static('public'));
// POST method route
app.post('/csv', jsonParser, function (req, res) {
    const csv = convertToCSV(req.body);
    console.log(csv);
    res.send(convertToJSON(req.body));
});

app.post('/xml', jsonParser, function (req, res) {
    const xml = convertToXML(req.body);
    console.log(xml);
    res.send(convertToJSON(req.body));
});

app.post('/yaml', jsonParser, function (req, res) {
    const yaml = convertToYaml(req.body);
    console.log(yaml);
    res.send(convertToJSON(req.body));
});

app.post('/json', jsonParser, function (req, res) {
    const json = convertToJSON(req.body);
    console.log(json);
    res.send(convertToJSON(req.body));
});

app.listen(3000);