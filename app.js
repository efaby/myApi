const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/routes.js");
const mongoose    = require("mongoose");
const cors = require("cors");
const config = require("./config/config");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');


const app = express();
const router = express.Router();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(config.database, { useNewUrlParser: true });
routes(router);
app.use("/api", router);


// -- setup up swagger-jsdoc --
const swaggerDefinition = {
	openapi: "3.0.0",
  	info: {
	    title: 'My Secure API',
	    version: 'v1',
	    description: 'A Secure Api RestFull',
	},
  	host: 'localhost:5001/api',
  	basePath: '/',
  	security: {
	    bearerAuth: [],
  	},
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

// -- routes for docs and generated swagger spec --

app.get("/ping", (req, res) => {
    res.status(200).send("I'm alive");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const server = app.listen(process.env.PORT || 5001, () => {
    console.log("Api RestFull is running on port", server.address().port);
});

module.exports = app;