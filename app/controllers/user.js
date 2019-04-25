const userModel = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const config = require("./../../config/config");

module.exports = {
 create: (req, res, next) => {  
  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, (err, result) => {
      if (err) 
        res.status(500).send({message: `Error al guardar en la base de datos: ${err} `})
      else
      res.status(200).send({status: "success", message: "User added successfully!!!", data: null})  
    });
 },

  authenticate: (req, res, next) => {
    userModel.findOne({email:req.body.email}, (err, userInfo) => {
      if (err) {
        res.status(500).send({message: `Error al realizar la petición: ${err} `})
      } else {
        if (!userInfo) {
          res.json({status:"error", message: "Invalid email/password!!!", data:null});
        } else {
          if(bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign({id: userInfo._id}, config.secret, { expiresIn: '1h' });
            res.json({status:"Authentication Done!", token});
          } else {
            res.json({status:"error", message: "Invalid email/password!!!", data:null});
          }
        }        
      }
    });
  },
  privateTest: (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' });
  },
}