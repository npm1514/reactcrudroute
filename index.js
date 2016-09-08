var express     = require('express'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    mongoose    = require('mongoose');

var thingCtrl = require('./thingCtrl');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.post('/thing', thingCtrl.create);
app.get('/thing', thingCtrl.read);
app.put('/thing/:id', thingCtrl.update);
app.delete('/thing/:id', thingCtrl.delete);

var mongoUri = "mongodb://localhost:27017/thingDB";
mongoose.connect(mongoUri);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function(){
  console.log("Connected to mongoDB");
});

app.listen(3000, function(){
  console.log("listening to port 3000");
});
