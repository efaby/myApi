module.exports = {
    "credentials": {
	    "username": process.env.USERNAME ? process.env.USERNAME : "userapi",
        "password": process.env.PASSWORD ? process.env.PASSWORD : "passapi"
    },
    "secret": "phaseSecureMyAPI",
    "database": process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/myapiDB",
};