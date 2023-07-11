const mongoose = require('mongoose');
const User  = require('./models/account');
const Listing = require('./models/listing');
var passportlocalmongoose=require("passport-local-mongoose");
const passport = require("passport");


mongoose.connect('mongodb://localhost:27017/finalProject')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const seedListing = [
    {
        name: 'Hotel Elizabeth Cebu',
        address:'Archbishop Reyes, 6000 Cebu City, Philippines',
        lat:10.320871,
        lng:123.902004,
        description: 'Rooms have elegant interiors and come well-equipped with air conditioning, a flat-screen cable TV and a minibar. En suite bathrooms provide hot and cold water facilities. Some rooms offer a seating area with sofa.', 
        username:'user',
        image:'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?w=1060&t=st=1665875037~exp=1665875637~hmac=04620a640e2f02af100941be4d065cd5972bb925dd85bf1534ca0cab87ca9bf1'
    },
    {
        name: 'Waterfront Cebu City Hotel & Casino',
        address:'Archbishop Reyes, 6000 Cebu City, Philippines',
        lat:10.320871,
        lng:123.902004,
        description: 'Rooms have elegant interiors and come well-equipped with air conditioning, a flat-screen cable TV and a minibar. En suite bathrooms provide hot and cold water facilities. Some rooms offer a seating area with sofa.', 
        username:'user',
        image:'https://img.freepik.com/free-photo/leisure-beautiful-health-garden-landscape_1203-4856.jpg?w=1060&t=st=1665875352~exp=1665875952~hmac=158900365b37a93ea9c71c8b412d875fe61848cb995deec64c2bda6bbb4d6444'
    },
    {
        name: 'Leope Hotel',
        address:'Archbishop Reyes, 6000 Cebu City, Philippines',
        lat:10.320871,
        lng:123.902004,
        description: 'Rooms have elegant interiors and come well-equipped with air conditioning, a flat-screen cable TV and a minibar. En suite bathrooms provide hot and cold water facilities. Some rooms offer a seating area with sofa.', 
        username:'sheeesh',
        image:'https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg?w=1060&t=st=1665875369~exp=1665875969~hmac=8abccc0e826bfcd117fa7ddd5c5811aa902fe2b16b676a2d1adf093fd8ef8b56'
    },
    {
        name: 'Radisson Blu Cebu',
        address:'Archbishop Reyes, 6000 Cebu City, Philippines',
        lat:10.320871,
        lng:123.902004,
        description: 'Rooms have elegant interiors and come well-equipped with air conditioning, a flat-screen cable TV and a minibar. En suite bathrooms provide hot and cold water facilities. Some rooms offer a seating area with sofa.', 
        username:'UserJuan',
        image:'https://img.freepik.com/premium-photo/design-restaurant-is-modern-style-with-wooden-pergola-ceiling_295714-6317.jpg?w=996'
    },
    {
        name: 'Alba Uno Hotel',
        address:'Archbishop Reyes, 6000 Cebu City, Philippines',
        lat:10.320871,
        lng:123.902004,
        description: 'Rooms have elegant interiors and come well-equipped with air conditioning, a flat-screen cable TV and a minibar. En suite bathrooms provide hot and cold water facilities. Some rooms offer a seating area with sofa.', 
        username:'CardoGwapo123',
        image:'https://img.freepik.com/premium-photo/bedroom-hotel-with-view-morning_29778-385.jpg?w=996'
    }
]

const seedAccount = [
    {
        username: 'user',
        password: 'user'
    }
]


User.register(new User({ username: 'user' }),
    'user', function (err, user) {
      if (err) {
          console.log(err);
      }
      console.log('username: user password: user')
  });

Listing.insertMany(seedListing)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })