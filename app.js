var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var User = require('./models/user');

var app = express();
var mongoose = require('mongoose');

//connection og MongoDB
var conn = mongoose.connect('localhost:27017/myapp');

if(conn){
  console.log('MongoDB Connected');
}else{
  console.log('MongoDB NOT Connected');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//view requests
app.post('/contactlists',function(req,res){
  console.log(">>>> "+req.body);
  var userTable = new User(req.body);
  userTable.save(function(err,docs){
    console.log(docs);
    res.json(docs);
  })
});

app.get('/contactlists',function(req,res){
  User.find(function(err,docs){
    //console.log(docs);
    res.json(docs)
  })
});

app.delete('/contactlists/:id',function(req,res){
  var id = req.params.id;
  //console.log(id);
  User.remove({ _id: id },function(err,doc){
    res.json(doc);
  })
})

app.get('/contact/:id',function(req,res){
  var id = req.params.id;
  User.findOne({_id:id},function(err,doc){
    res.json(doc);
  });
});

app.put('/contactlists/:id',function(req,res){
  var id = req.params.id;
  //console.log(req.body.name);
  User.findOneAndUpdate({_id:id},{$set:{name:req.body.name,email:req.body.email}}, {new: true}, function(err, doc){
    res.json(doc);
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
