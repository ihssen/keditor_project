const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var fs = require('fs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/saveContent', function (req, res) {
var content = req.body.content;

fs.writeFile("content", content, function(err) {
    if(err) {
        console.log(err);
        res.send({ok:false});
    }else{
        console.log("The file was saved!");
        res.send({ok:true});
    }
});

})

app.get('/getContent', function (req, res) {

fs.readFile("content", 'utf8', function(err,content) {
    if(err) {
        console.log(err);
        res.send({error:true});
    }else{
        res.send({error:false,content:content});
    }
});

})


app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
