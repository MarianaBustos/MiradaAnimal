var express = require("express");
const indexController = require("../controllers/indexController");
var router = express.Router();

// ruta base del archivo: localhost:3000

/* GET home page. */
// localhost:3000
router.get("/", indexController.getAllTrainers);

router.get("/", indexController.viewRegisterNews);
module.exports = router;

router.post("/", indexController.registerNews);
module.exports = router;
