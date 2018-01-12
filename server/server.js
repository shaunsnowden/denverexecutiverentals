const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
// const sendmail = require('sendmail')();


const Properties = require('./models/Properties.js');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

console.log(path.resolve("../build"));
console.log(path.join(__dirname, "../build"));

app.use(express.static(path.join(__dirname, "../build")));

app.get('/api', (req, res) => res.send('Hello World from 8080!'));

// app.post("/api/sendmail", sendmail);

// function sendmail(req, res) {
//     sendmail({
//         from: 'brandonggood@gmail.com',
//         to: 'brandonggood@gmail.com',
//         subject: 'test sendmail',
//         html: 'Mail of test sendmail ',
//     }, function (err, reply) {
//         console.log(err && err.stack);
//         console.dir(reply);
//         console.log("Email Sent!")
//     });
// }

app.get('/api/properties', (req, res) => {
  Properties.find({})
   .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message ? err.message : 'Internal Server Blowup')
    });
});

var databaseUri = "mongodb://localhost/Properties";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}

app.get('/api/rentals', (req, res) => {
  Properties.findOne(req.body.sub)
    // 'tenantPassword' : 'req.query.sub' 
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message ? err.message : 'Internal Server Blowup')
    });
});

app.get("/api/seed", (req, res) => {
  let properties = [
    { 
        id: "1",
        propertyTitle: "The Views at Historic Kenny's House", 
        propertyAddress: "1680 Balsam Avenue, Boulder, CO 80304",
        lat: "40.026611",
        lng: "-105.275553", 
        image: "https://image3.apartmentfinder.com/i2/fuJeti0beb-aWKnsjm3J--cbquxgP3CMBT9aYgZr83Y/110/soulard-market-loft-apartments-saint-louis-mo-primary-photo.jpg",
        occupied: "1",
        tenantName: "Brandon Good",
        tenantEmail: "",
        tenantPassword: "google-oauth2|107910418125029097545",
        TenantPhone: "314-936-0268",
        leaseStart: "7/1/2017",
        leaseEnd: "6/30/2018",
        monthlyRent: "800",
        rentDueDate: "2/1/2018",
        rentPaid: true
    }, 
    { 
        id: "2",
        propertyTitle: "The Lofts at SoDaSoPa", 
        propertyAddress: "4900 Qualla Drive, Boulder, CO 80303",
        lat: "39.991166",
        lng: "-105.233076", 
        image: "https://images1.apartments.com/i2/H08vGwbM0f7OnrMWiOPrz4356l9N-ZtuSp1_D0ZHBs0/117/the-apartments-at-denver-place-denver-co-building-photo.jpg",
        occupied: "0",
        tenantName: "",
        tenantEmail: "",
        tenantPassword: "",
        TenantPhone: "",
        leaseStart: "",
        leaseEnd: "",
        monthlyRent: "950",
        rentDueDate: "",
        rentPaid: null
    }, 
    { 
        id: "3",
        propertyTitle: "The Residences at the Lofts at SoDaSoPa", 
        propertyAddress: "295 Laurel Street, Broomfield, CO 80020", 
        lat: "39.919468",
        lng: "-105.085131",
        image: "https://exp.cdn-hotels.com/hotels/3000000/2230000/2226500/2226460/2226460_218_z.jpg",
        occupied: "0",
        tenantName: "",
        tenantEmail: "",
        tenantPassword: "",
        TenantPhone: "",
        leaseStart: "",
        leaseEnd: "",
        monthlyRent: "700",
        rentDueDate: "",
        rentPaid: null
    }, 
    { 
        id: "4",
        propertyTitle: "CtPa Town", 
        propertyAddress: "1715 Grove Street, Denver, CO 80204", 
        lat: "39.744523",
        lng: "-105.027074",
        image: "https://www.iretapartments.com/PropertyImage/15111966633-7176/display/Dylan-RiNo-Apartments-Panoramic-Views-Downtown-Denver-Rocky-Mountain-Front-Range.jpg",
        occupied: "1",
        tenantName: "Shaun Snowden",
        tenantEmail: "",
        tenantPassword: "facebook|10212439964008955",
        TenantPhone: "303-672-9463",
        leaseStart: "1/1/2018",
        leaseEnd: "3/31/2018",
        monthlyRent: "750",
        rentDueDate: "1/20/2018",
        rentPaid: false
    }, 
    { 
        id: "5",
        propertyTitle: "Robot Arms", 
        propertyAddress: "100 E. 9th Avenue, Denver, CO 80203", 
        lat: "39.730424",
        lng: "-104.985729",
        image: "https://vignette2.wikia.nocookie.net/en.futurama/images/0/0a/RobotArmsApartments.png/revision/latest?cb=20110615130732",
        occupied: "1",
        tenantName: "Elena Finley",
        tenantEmail: "",
        tenantPassword: "google-oauth2|110393868749946166933",
        TenantPhone: "720-186-0379",
        leaseStart: "12/1/2017",
        leaseEnd: "5/30/2018",
        monthlyRent: "600",
        rentDueDate: "1/25/2018",
        rentPaid: true
    }, 
    { 
        id: "6",
        propertyTitle: "Turntable Studios", 
        propertyAddress: "1443 Elizabeth Street, Denver, CO 80206", 
        lat: "39.739500",
        lng: "-104.956645",
        image: "https://images1.apartments.com/i2/zh44X8pi-pXnaPaTZ6xwfLi6gm8VH8TKmBwhkGS__FI/110/turntable-studios-denver-co-primary-photo.jpg",
        occupied: "0",
        tenantName: "",
        tenantEmail: "",
        tenantPassword: "",
        TenantPhone: "",
        leaseStart: "",
        leaseEnd: "",
        monthlyRent: "650",
        rentDueDate: "",
        rentPaid: null
    }, 
    { 
        id: "7",
        propertyTitle: "Dry Creek Crossing", 
        propertyAddress: "7106 S. Verbena Way, Centennial, CO 80112", 
        lat: "39.587317",
        lng: "-104.890315",
        image: "https://u.realgeeks.media/garlandthurman/open_floorplan_2_505_for_web_big.jpg",
        occupied: "1",
        tenantName: "Justin Shaw",
        tenantEmail: "",
        tenantPassword: "linkedin|XOnMg65EhN",
        TenantPhone: "351-325-9297",
        leaseStart: "10/1/2017",
        leaseEnd: "9/30/2018",
        monthlyRent: "850",
        rentDueDate: "2/2/2018",
        rentPaid: false
    }, 
    { 
        id: "8",
        propertyTitle: "DTC Corporate Suite", 
        propertyAddress: "8101 E. Prentice Ave., Greenwood Village, CO 80111", 
        lat: "39.620883",
        lng: "-104.893674",
        image: "https://odis.homeaway.com/odis/listing/a3c44e2c-8647-4a1d-a986-1352b91080b7.c10.jpg",
        occupied: "0",
        tenantName: "",
        tenantEmail: "",
        tenantPassword: "",
        TenantPhone: "",
        leaseStart: "",
        leaseEnd: "",
        monthlyRent: "800",
        rentDueDate: "",
        rentPaid: null
    }, 
    { 
        id: "9",
        propertyTitle: "University Lofts", 
        propertyAddress: "2373 E. Evans Ave., Denver, CO 80210", 
        lat: "39.678838",
        lng: "-104.958742",
        image: "https://photos.zillowstatic.com/p_e/ISiv729gklxnbt1000000000.jpg"   ,
        occupied: "1",
        tenantName: "Jacques Guillory",
        tenantEmail: "",
        tenantPassword: "google-oauth2|108582059980518586859",
        TenantPhone: "202-142-4828",
        leaseStart: "8/1/2017",
        leaseEnd: "1/31/2018",
        monthlyRent: "1,000",
        rentDueDate: "1/15/2018",
        rentPaid: true
    }, 
    { 
        id: "10",
        propertyTitle: "Boulder Bunks", 
        propertyAddress: "3128 Big Horn St., Boulder, CO 80301", 
        lat: "40.042379",
        lng: "-105.251553",
        image: "http://www.cuboulderrentals.com/wp-content/uploads/2013/07/Buffalo-Canyon-Apartments.jpg",
        occupied: "0",
        tenantName: "",
        tenantEmail: "",
        tenantPassword: "",
        TenantPhone: "",
        leaseStart: "",
        leaseEnd: "",
        monthlyRent: "1,200",
        rentDueDate: "",
        rentPaid: null
    }, 
    { 
        id: "11",
        propertyTitle: "Historic Georgetown", 
        propertyAddress: "1431 Marion St., Georgetown, CO 80444", 
        lat: "39.713838",
        lng: "-105.694158",
        image: "https://i.pinimg.com/736x/47/de/c0/47dec0559b96ed57c94a9937eb16a6b5--vacation-rentals-vacations.jpg",
        occupied: "1",
        tenantName: "Rachel Smith",
        tenantEmail: "",
        tenantPassword: "google-oauth2|114848345609372917109",
        TenantPhone: "986-482-0045",
        leaseStart: "11/1/2017",
        leaseEnd: "7/31/2018",
        monthlyRent: "1,100",
        rentDueDate: "2/5/2018",
        rentPaid: false
    }, 
    { 
        id: "12",
        propertyTitle: "The Villas at Vail", 
        propertyAddress: "1055 Homestake Circle, Vail, CO 81657", 
        lat: "39.640232",
        lng: "-106.358315",
        image: "https://mobilepics.luxuryretreats.com/mediastock/med/600x352/1/119/118244_TheCharterPenthouse_Colorado_01.jpg",
        occupied: "0",
        tenantName: "",
        tenantEmail: "",
        tenantPassword: "",
        TenantPhone: "",
        leaseStart: "",
        leaseEnd: "",
        monthlyRent: "1,000",
        rentDueDate: "",
        rentPaid: null
    }
];
Properties.remove({});
properties.forEach((property) => Properties.create(property));
res.sendStatus(204);
});
// app.post('/api/posts', (req, res) => {
//   let newPost = new Post();
//   newPost.title = req.body.title;
//   newPost.body = req.body.body;
//   newPost.author = req.body.author;
//   newPost.save()
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send(err.message ? err.message : 'Internal Server Blowup')
//     });
// });

// HERE IS WHERE WE NAME OUR DATABASE
mongoose.connect('mongodb://localhost/Properties');

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
