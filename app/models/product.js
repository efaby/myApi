const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const productSchema = new Schema({
    "name": { 
    	type: String,
    	required: true,
    	max: 100  },
    "price": { 
 		type: Number,
 		required: true,
 		default: 0 },
 	"description": { 
 		type: String },
 	"picture": { 
 		type: String },
 	"category": { 
 		type: String, 
 		enum: ['computers', 'phones', 'accesories'] 
 	},
 	"createdAt": { 
 		type: Date,
 		default: Date.now }	
}, { versionKey: false });

module.exports = mongoose.model("Product", productSchema);