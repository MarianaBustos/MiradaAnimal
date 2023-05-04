var express = require("express");
const trainerController = require("../controllers/trainerController");

const uploadImage = require("../middleware/multer");
var router = express.Router();

// Ruta base : localhost:3000/trainer

// Muestra el formulario de registro
// localhost:3000/trainer/register

router.get("/register", trainerController.viewRegisterForm);

// Guarda los datos de un nuevo entrenador
// localhost:3000/trainer/register
router.post("/register", uploadImage("trainers"), trainerController.register);

// Muestra la vista de perfil de un entrenador con sus obras
// localhost:3000/trainer/oneTrainer/:id
router.get("/oneTrainer/:id", trainerController.viewOneTrainer);

// Muestra la vista de con todos los entrenadores
// localhost:3000/trainer/allTrainers
router.get("/allTrainers", trainerController.viewAllTrainers);

// Muestra el formulario de login
// localhost:3000/trainer/login
router.get("/login", trainerController.viewLoginForm);

// Comprueba las credenciales de logueo
// localhost:3000/trainer/login
router.post("/login", trainerController.login);

// Comprueba las credenciales de logueo
// localhost:3000/trainer/login
router.post("/allTrainers", trainerController.searchTrainer);

module.exports = router;
