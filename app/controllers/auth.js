"use strict";

const jwt = require("jsonwebtoken");
const config = require("./../../config/config");

const authenticate = (req, res) => {
    if(req.body.username === config.credentials.username && req.body.password === config.credentials.password) {	        
        const payload = { check:  true };
        var token = jwt.sign(payload, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.json({
            message: "Authentication Done",
            token: token
        });

    }else{
        res.json({message:"Invalid Credentials!"});
    }
};

const valideToken = (req, res, next) => {
    var token = req.headers["access-token"];
    if (token) {
      	jwt.verify(token, config.secret, (err, decoded) =>{      
	        if (err) {
	         	return res.json({ message: `invalid token ${err.message}` });    
	        } else {
	        	req.decoded = decoded;    
	        	next();
	        }
	    });
    } else {
        res.send({
            message: "No token provided." 
        });

    }
};

module.exports = {
    authenticate,
    valideToken
};