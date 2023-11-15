const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

const port = process.env.PORT || 8080; 

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

mercadopago.configure({
    access_token: process.env.AccessToken,
});

app.get("/", function (req, res) {
    res.send("el servidor de mercado pago funciona! :)");
});

app.post("/create_preference", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: 1,
            },
        ],
        back_urls: {
            success: "https://eventox-client-peach.vercel.app/successful-payment",
            failure: "https://eventox-client-peach.vercel.app/failed-payment",
            pending: "",
        },
        auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log("the server is now running on port 8080");
});
