const userCtrl = require("./../app/controllers/user");
const productCtrl = require("./../app/controllers/product");
const authService = require("./../services/auth");
const path = require("path");
const exec = promisify(childProcess.exec);

const appRouter = (router) => {

    router.get("/", (req, res) => {
        res.json({ message: "Welcome to our RestFull API!" });   
    });

    router.post("/update-branch", async (req, res) => {  
        const { payload } = req.body;
        const {ref} = JSON.parse(payload);    
            
        if (ref) {         
            const { stdout } = await exec('git symbolic-ref --short HEAD');
            const currentBranch = stdout.trimRight();
            const pushBranch = ref.split("/").slice(2).join("/");    
    
            if (currentBranch === pushBranch ){
                console.log(`${currentBranch} is equal to ${pushBranch}  then updating the container!`);
                // pull origin branch allowed       
                exec(`. ${path.join(__dirname, '..', 'update.sh')}`);
            }
        } else {
            console.log('ref is undefined ');
            console.log(ref);
        }
        res.sendStatus(200);
    });
    
  	router.post("/authenticate", userCtrl.authenticate);
  	router.post("/register",userCtrl.create);
    router.use(authService.valideToken);

    /**
     * @swagger
     * components:
     *   schemas:
     *     product:
     *       properties:
     *         name:
     *           type: string
     *         price:
     *           type: number
     *         description:
     *           type: string
     *         picture:
     *           type: string
     *         category:
     *           type: string
     *           example: computers|phones|accesories
     *   securitySchemes:
     *     beaberAuth:
     *       type: http
     *       scheme: bearer
     *       in: header
     *       name: access-token
     *
     * /product:
     *   get:
     *     tags:
     *       - Products
     *     description: Returns all products
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of products
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 products:
     *                   type: array
     *                   items:
     *                     type: object 
     *       401:
     *         description: No token provided.        
     */
    router.route("/product")
        .get(productCtrl.getProducts);


    /**
     * @swagger
     * /product/{id}:
     *   get:
     *     tags:
     *       - Products
     *     description: Get specific product
     *     parameters:
     *       - name: id
     *         description: Product id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Get product by id
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 product:
     *                   $ref: '#/components/schemas/product' 
     *       401:
     *         description: No token provided.
     *       404:
     *         description: Product not found.
     */
    router.route("/product/:productId")
        .get(productCtrl.getProduct);

     /**
     * @swagger
     * /product:
     *   post:
     *     tags:
     *       - Products
     *     description: Creates a new product
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: product
     *         description: product data
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/product'
     *     responses:
     *       200:
     *         description: Successfully created product
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 product:
     *                   $ref: '#/components/schemas/product' 
     *       401:
     *         description: No token provided.
     */
    router.route("/product")
        .post(productCtrl.saveProduct);

    /**
     * @swagger
     * /product/{id}:
     *   put:
     *     tags:
     *       - Products
     *     description: Updates a single product
     *     produces: application/json
     *     parameters:
     *       - name: id
     *         description: Product id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *       - name: product
     *         description: product data
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/product'
     *     responses:
     *       200:
     *         description: Successfully product updated
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 product:
     *                   $ref: '#/components/schemas/product' 
     *       401:
     *         description: No token provided.
     *       404:
     *         description: Product not found.
     */
    router.route("/product/:productId")
        .put(productCtrl.updateProduct);

     /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     tags:
     *       - Products
     *     description: Deletes a single product
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Product id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successfully deleted product
     *         schema:
     *           properties:
     *             message:
     *              type: string
     *       401:
     *         description: No token provided.
     *       404:
     *         description: Product not found.
     */
    router.route("/product/:productId")
        .delete(productCtrl.deleteProduct);
    router.route("/private")
        .get(userCtrl.privateTest);
};

module.exports = appRouter;