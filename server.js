const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

mercadopago.configure({
    access_token: "TEST-367333146683112-111416-576eba2f4e6b7439cd97b8b4ead90ae2-1549810806",
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
                quantity: Number(req.body.quantity),
            },
        ],
        back_urls: {
            success: "http://localhost:3000/successful-payment",
            failure: "http://localhost:3000/failed-payment",
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

app.listen(8080, () => {
    console.log("the server is now running on port 8080");
});