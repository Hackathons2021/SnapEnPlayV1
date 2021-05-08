var express = require('express');
var router = express.Router();
const multer = require('multer');
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const csrfMiddleware = csrf({ cookie: true });
const serviceAccount = require("./serviceAccountKey.json");
router.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://snapenplay-default-rtdb.firebaseio.com/",
});
//const { getMaxListeners } = require('node:process');
router.use(csrfMiddleware);
/* GET users listing. */

let db=admin.database()
var ref = db.ref("maps");
var spawn = require('child_process').spawn
var path=require('path')
/* GET home page. */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    /*Appending extension with original name*/
    cb(null, 'image' + path.extname(file.originalname)) 
  }
})
//var upload = multer({ storage: storage });
const upload = multer({dest: __dirname + '/public/images',
storage:storage,
limits: {
  fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpeg|png|jpg)$/)){
  cb(new Error('Please upload a .image.'))
  }
  cb(undefined, true)
  }
  });

router.get('/', function(req, res, next) {
  res.render("first", {name:'as'});
            
});
router.post('/upload', upload.single('upload'), (req, res) => {
  // if(req.file) {
  //     res.json(req.file);
  // }
  // else throw 'error';
  a=path.extname(req.file.originalname)
  b=a.split('.')
  console.log(b[1])
  res.redirect('/python?id='+b[1])//+path.extname(req.file.originalname))
});

router.get('/python', (req, res) => {
 
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['model.py',req.query.id]);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  python.stderr.on('data', (data) => {
    console.log(data.toString())
    //nosuccess(data);
});
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.redirect('/game?username='+req.query.username+'&string='+dataToSend)
  });
  
 })
 


 router.get('/game',(req,res)=>{
  var a=req.query.username
  var b=req.query.string
var post=ref.push(b);
var postkey=post.key
res.render('game',{url:`https://snapenplay.herokuapp.com/share?key=${key}`,name:a,array:b})
 })

router.get('/share',(req,res)=>{
  var key=req.query.key
  ref.on("value", function(snapshot) {
    chil=snapshot.val();
    console.log(chil)
    a='-M_CDV5Zkd-UG089UXw3'
  console.log(chil[a])
  b=chil[a].toString()
  res.render('game',{url:`https://snapenplay.herokuapp.com/share?key=${key}`,name:'sharedGame',array:`${chil[a]}`})
  });
})


module.exports = router;