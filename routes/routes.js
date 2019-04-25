const userCtrl = require("./../app/controllers/user");
const productCtrl = require("./../app/controllers/product");
const authService = require("./../services/auth");

const appRouter = (router) => {

    router.get("/", (req, res) => {
        res.json({ message: "Welcome to our RestFull API!" });   
    });
  	router.post("/authenticate", userCtrl.authenticate);
  	router.post("/register",userCtrl.create);
    router.use(authService.valideToken);
    router.route("/product")
        .get(productCtrl.getProducts);
    router.route("/product/:productId")
        .get(productCtrl.getProduct);
    router.route("/product")
        .post(productCtrl.saveProduct);
    router.route("/product/:productId")
        .put(productCtrl.updateProduct);
    router.route("/product/:productId")
        .delete(productCtrl.deleteProduct);
    router.route("/private")
        .get(userCtrl.privateTest);
};

module.exports = appRouter;