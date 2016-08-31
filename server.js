var express        = require("express");
var app            = express();
var http	   = require(http);
var server	   = http.createServer(app);
var bodyParser     = require("body-parser");
var methodOverride = require("method-override"); // methodOverride() nos permite implementar y personalizar métodos HTTP.
var mongoose       = require('mongoose');
var TVShowCtrl 	   = require('./controllers/tvshows'); // incluimos el controller "tvshows.js" que incluye las llamadas GET/POST/PUT/DELETE a MongoDB a través de Mongoose.

// Para poder extraer datos de un formulario gracias a "body-parser".
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


// ----- ROUTE EXAMPLE --------------------------------------------------------------------------------
var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);
// ----------------------------------------------------------------------------------------------------


// ---- MongoDB Database Connection -------------------------------------------------------------------
// Si establecemos la conexión con MongoDB arrancamos el server en el puerto 3000.
mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});



// ------------  API routes ---------------------------------------------------------------------------
var tvshows = express.Router();

tvshows.route('/tvshows')  
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')  
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows); 

// ----------------------------------------------------------------------------------------------------
