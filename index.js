const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const sessions = require('express-session');
const methodOverride = require('method-override');
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require('./models/account');
const Listing = require('./models/listing');
const Review = require('./models/review');
const moment = require('moment')
const app = express(); 

mongoose.connect('mongodb://localhost:27017/finalProject')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })
   
    app.use(express.static(path.join(__dirname,'/public')));
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({extended: true}));
    app.use(methodOverride('_method'));

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(require("express-session")({
      secret: "Rusty is a dog",
      resave: false,
      saveUninitialized: false
  }));

  app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
 

  app.use(passport.initialize());
  app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Form to add new account
app.get('/register', (req, res) => {
  res.locals.login = req.isAuthenticated();
  res.render('register');
})

// Insert new account
app.post("/register", function (req, res) {
  var username = req.body.username
  var password = req.body.password
  User.register(new User({ username: username }),
          password, function (err, user) {
      if (err) {
          console.log(err);
          res.redirect("/");
      }
      passport.authenticate("local")(
          req, res, function () {
          res.redirect("/");
      });
  });
})

//Showing login form
app.get("/login", function (req, res) {
  if (!req.isAuthenticated()){ 
    res.locals.login = req.isAuthenticated();
    res.render("login", {user: req.user});
  }else{
    res.redirect("/");
  }
});


//Handling user login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function (req, res) {
  session=req.session;
  session.userid=req.body.username;
  console.log(req.session)
});


// Form to add new listing
app.get('/add', (req, res) => {
  if (req.isAuthenticated()){ 
    res.locals.login = req.isAuthenticated();
    res.render('add', {user: req.user});
  }else{
    res.redirect("/");
  }
})

// Insert new listing
app.post('/listing', async (req, res) => {
  const addlisting = new Listing(req.body);
  await addlisting.save();
  console.log(addlisting);
  res.redirect(`/`);
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

//Handling user logout
app.get("/logout", function (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Form to add new review
app.get('/addreview/:id', (req, res) => {
  const {id} = req.params;
  if (req.isAuthenticated()){ 
    res.locals.login = req.isAuthenticated();
    res.render('addreview', {id, user: req.user});
  }
})

// Insert new review
app.post('/addreview/:id', async (req, res) => {
  const {id} = req.params;
  const addreview = new Review(req.body);
  await addreview.save();
  console.log(addreview);
  res.redirect(`/list/${id}`);
})


// View specific product
app.get('/list/:id', async (req, res) => {
  const {id} = req.params;
  const list = await Listing.findById(id);
  const reviews = await Review.find({listing_id: id}).sort({'datePosted': -1});
  res.locals.login = req.isAuthenticated();
  if (req.isAuthenticated()){ 
    res.render('show', {list, reviews, user: req.user, moment: moment});
  }else{
  res.render('show', {list, reviews, moment: moment});
  }
  
})

// View My-List template
app.get('/mylist', async (req, res) => {
  const lists = await Listing.find({username: req.user.username}).sort({'datePosted': -1});
  if (req.isAuthenticated()){ 
    res.locals.login = req.isAuthenticated();
    res.render('mylist', {lists, user: req.user, moment: moment});
  }else{
    res.redirect('/');
  }
})


// Delete a product
app.delete('/deletelist/:id', async (req, res) => {
  if (req.isAuthenticated()){ 
    const {id} = req.params;
    const deletelists = await Listing.findByIdAndDelete(id);
    res.redirect('/mylist');
  }
})

// Form to update a product
app.get('/updatelist/:id', async (req, res) => {
  if (req.isAuthenticated()){ 
    res.locals.login = req.isAuthenticated();
    const {id} = req.params;
    const list = await Listing.findById(id);
    res.render('edit', {list, user: req.user});
  }
})

// Update a product
app.put('/update/:id', async (req, res) => {
  if (req.isAuthenticated()){ 
  const {id} = req.params;
  const update = await Listing.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
  res.redirect(`/mylist`);
  }
})

// View all listing
app.get('/', async (req, res) => {
  const lists = await Listing.find({}).sort({'datePosted': -1});
  const rates = await Review.find({});
  res.locals.login = req.isAuthenticated();
  res.render('home', {lists, rates, user: req.user, moment: moment});
})

app.get('*', (req, res) => {
  res.render("404");
})

app.listen(3000, () => {
    console.log("Listening to port 3000!");
})