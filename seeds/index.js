const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64a065af3a5869fdc87de5d3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab consectetur vitae exercitationem reiciendis, nesciunt expedita adipisci, temporibus perspiciatis obcaecati id veniam ipsam assumenda illum quibusdam? Similique veritatis a nam fugit.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/divcrmitd/image/upload/v1688667105/YelpCamp/eyiwfcpfryr0ejgm1fxw.jpg',
                    filename: 'YelpCamp/eyiwfcpfryr0ejgm1fxw',
                },
                {
                    url: 'https://res.cloudinary.com/divcrmitd/image/upload/v1688667105/YelpCamp/pqippzik3zd5q6rvjn0v.jpg',
                    filename: 'YelpCamp/pqippzik3zd5q6rvjn0v',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})