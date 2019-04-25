const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/routes.js");
const mongoose    = require("mongoose");
const cors = require("cors");
const config = require("./config/config");
const app = express();
const router = express.Router();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(config.database, { useNewUrlParser: true });
routes(router);
app.use("/api", router);

app.get("/ping", (req, res) => {
    res.status(200).send("I'm alive");
});

const server = app.listen(process.env.PORT || 5001, () => {
    console.log("Api RestFull is running on port", server.address().port);
});