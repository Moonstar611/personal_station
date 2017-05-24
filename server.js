//load public modules
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path"); //for VA
var passport = require("passport");//for VA
var session = require("express-session");
var app = express();
dotenv.load();
//load my modules
    //S_C
var SCroutes = require(process.cwd() + "/stock_chart/server/routes/request_router.js");//the SCroutes to deal with request from client of stock chart app
var SCsockets = require(process.cwd() + "/stock_chart/server/socket.js");//so socket to communicate with client
    //V_A
var VAroutes = require(process.cwd() + "/voting_app/server/server_router.js");//Router for voting app
var VApassportConfig = require(process.cwd() + "/voting_app/server/config/passport_config.js")//used to configure passport
    //P_P
var PProutes = require(process.cwd()+"/personal_page/server/server_router.js")
//connect mongoDB
//var db = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydb")//connect database
var db = mongoose.connect("mongodb://qiaochu:qwertyuiop2004@ds151951.mlab.com:51951/heroku_tchnpbjv")

//server start
var server = http.createServer(app); //create server
 //load env
app.use(bodyParser.urlencoded({ extended: true })); //use bodyparser
app.use(bodyParser.json());//use bodyparser
var io = new socketio(server);//create io on the server (for stock chart app)

//App-specified settings
    //S_C
SCsockets(app,io);//resgister the sockets of 
SCroutes(app);//register router
    //V_A
app.use(session({
    secret: "Moonstar611",
    resave: false,
    saveUninitialized :true  
}));
app.use(passport.initialize());
app.use(passport.session());
VApassportConfig(passport);//configure passport
VAroutes(app,passport); //register the router
    //homepage contact
PProutes(app);



//page router
app.use('/home', function(req,res){
    console.log('homepage is visited');
    res.sendFile(process.cwd()+'/personal_page/index.html');
});

app.use('/pomodoro_clock', function(req,res){
    console.log('pomodoro clock is visited');
    res.sendFile(process.cwd()+'/pomodoro_clock/index.html');
});

app.use('/random_quote', function(req,res){
    console.log('random quote machine is visited');
    res.sendFile(process.cwd()+'/random_quote/index.html');
});

app.use('/simon_game', function(req,res){
    console.log('simon game is visited');
    res.sendFile(process.cwd()+'/simon_game/index.html');
});

app.use('/wiki_viewer', function(req,res){
    console.log('wiki viewer is visited');
    res.sendFile(process.cwd()+'/wiki_viewer/index.html');
});

app.use('/local_weather', function(req,res){
    console.log('local weather is visited');
    res.sendFile(process.cwd()+'/local_weather/index.html');
});

app.use("/stock_chart", function(req,res,next){
    res.sendFile(process.cwd()+"/stock_chart/client/index.html");
});

app.use("/voting_app", function(req,res,next){
    res.sendFile(process.cwd()+"/voting_app/public/index.html");
});

app.get('/', function(req,res){
    console.log('homepage is visited');
    res.sendFile(process.cwd()+'/personal_page/index.html');
});




//page css and js router
app.use('/p_c',express.static(process.cwd()+'/pomodoro_clock'));
//app.use('/h_p',express.static(process.cwd()+'/home_page'));
app.use('/p_p', express.static(process.cwd()+'/personal_page/public'));
app.use('/r_q',express.static(process.cwd()+'/random_quote'));
app.use('/s_g',express.static(process.cwd()+'/simon_game'));
app.use('/l_w',express.static(process.cwd()+'/local_weather'));
app.use('/w_v',express.static(process.cwd()+'/wiki_viewer'));
app.use('/s_c',express.static(process.cwd()+'/stock_chart/client'));
app.use('/v_a/public',express.static(process.cwd()+'/voting_app/public'));
app.use('/v_a/client',express.static(process.cwd()+'/voting_app/client'));



server.listen(process.env.PORT, process.env.IP, function(){
  var addr = server.address();
  console.log("Chat server listening at", (addr.address||process.env.IP) + ":" + (addr.port||process.env.PORT));
});