//###############################################
//############### this is BACKEND ###############
//###############################################
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
path;
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static("public/js"));
app.use(express.static("public/css"));
app.use(express.static("public/img"));
app.set("port", process.env.PORT || 9876);

/* ####### REQUEST / */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html")); //########## a backend =>> vissza a feladónak sora
});

/* ####### REQUEST /ROUTING GET */
app.get("/person", (req, res) => {
    const client = getClient();
    client.connect(async (err) => {
        const collection = client.db("post-test").collection("test");
        const person = await collection.find().toArray();
        client.close();
        res.send(person); //############################################# a backend =>> vissza a feladónak sora
    });
});

/* ####### REQUEST /ROUTING POST */
app.post("/person", bodyParser.json(), (req, res) => {
    const newPerson = {
        userName: req.body.userName,
        email: req.body.email,
        age: req.body.age,
        message: req.body.message,
    };
    const client = getClient();
    client.connect(async (err) => {
        const collection = client.db("post-test").collection("test");
        const result = await collection.insertOne(newPerson);
        if (result.insertedCount) {
            res.send({ error: "nem lehet insertálni, azaz creálni" }); // a backend =>> vissza a feladónak sora
            console.log(result.insertedCount);
            return;
        }
    });
    res.send(newPerson); //############################################## a backend =>> vissza a feladónak sora
    client.close();
});

/* ####### CONNECTION STRING */
function getClient() {
    const { MongoClient } = require("mongodb");
    const uri =
        "mongodb+srv://photovegh:Sususoft_0913@cluster0.gfjvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    return new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

/* ####### APP LISTING */
app.listen(app.get("port"), function () {
    console.log(
        "Az expressz elindult a http: // test:" +
            app.get("port") +
            " helyen; a Ctrl-C megnyomásával zárja be a szervert."
    );
});
