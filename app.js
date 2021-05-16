const { response } = require('express');
var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require ('mercadopago');
var port = process.env.PORT || 3000
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mercadopago.configure({
    integrator_id: 'dev_2e4ad5dd362f11eb809d0242ac130004',
    access_token:"APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439"
});






app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);

});
app.post('/ipn',(req,res)=>{
    console.log(req.body.body);
    res.status(200);
    res.send(200)
})
app.get('/ipn',(req,res)=>{
    console.log(req.body.body);
    res.status(200);
    res.send(200)
})



app.post('/detail', function(req,res){

    let preference = {
         items: [{
             id:"1234",
             title: req.body.title,
             unit_price: parseInt(req.body.price),
             quantity: parseInt(req.body.unit),
             currency_id: "PEN",
             picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
             description: "Dispositivo móvil de Tienda e-commerce​",
         }],

         payer: {
           name: "Lalo",
            surname: "Landa",
            email: "test_user_46542185@testuser.com",
            "phone": {
                "area_code": "52",
                "number": 5549737300
            },
            "identification": {
                "type": "DNI",
                "number": "22334445"
            },
            "address": {
                "street_name": "StreInsurgentes Suret",
                "street_number": 1602,
                "zip_code": "03940"
            }

        },

         back_urls: {
             "success": "https://jhonatan917-mp-commerce-nodejs.herokuapp.com/",
             "failure": "https://jhonatan917-mp-commerce-nodejs.herokuapp.com/",
             "pending": "https://jhonatan917-mp-commerce-nodejs.herokuapp.com/"
         },
         auto_return: 'approved',

         "payment_methods": {
            "excluded_payment_methods": [
                {
                    "id": "diners"
                }
            ],
            "excluded_payment_types": [
                {
                    "id": "atm",
                }
            ],
            "installments": 6
        },

         external_reference:"wily9170@gmail.com",
         "notification_url": "https://jhonatan917-mp-commerce-nodejs.herokuapp.com/ipn",
     };

    mercadopago.preferences.create(preference)
    .then(function(response){
        res.redirect(response.body.init_point);
    }).catch(function(error){
      console.log(error);
    });
})




app.listen(port);