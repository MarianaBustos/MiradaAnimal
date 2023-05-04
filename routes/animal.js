var express = require("express");
const animalController = require("../controllers/animalController");
const uploadImage = require("../middleware/multer");
var router = express.Router();

// Ruta base del archivo: localhost:3000/animal

// Muestra todos los animales de todos los entrenadores

// localhost:3000/animal
router.get("/", animalController.viewAllAnimals);

// Muestra el formulario de crear un nuevo animal
// localhost:3000/animal/createAnimal/:id
router.get("/createAnimal/:id", animalController.viewCreateAnimalForm);

// Guarda la información de un nuevo animal de un entrenador en concreto
// localhost:3000/animal/createAnimal/:id
router.post(
  "/createAnimal/:id",
  uploadImage("animals"),
  animalController.saveAnimal
);

// Renderiza el formulario de crear un animal desde el navbar.
// localhost:3000/animal/addAnimalNavbar
router.get("/addAnimalNavbar", animalController.addAnimalNavbar);

// Guarda la información de un animal desde el formulario del navbar
// localhost:3000/art/addAnimalNavbar
router.post(
  "/addAnimalNavbar",
  uploadImage("animals"),
  animalController.saveAnimalNavbar
);

// Elimina de manera real un animal
// localhost:3000/animal/delete/:animal_id/:trainer_id
router.get("/delete/:animal_id/:trainer_id", animalController.delete);
module.exports = router;

// Renderiza la vista para editar un animal
// localhost:3000/animal/editAnimal/:animal_id
router.get("/editAnimal/:animal_id", animalController.viewEditForm);

// Guarda la información editada de un animal
// localhost:3000/animal/editAnimal/:animal_id
router.post(
  "/editAnimal/:animal_id/:trainer_id",
  uploadImage("animals"),
  animalController.saveEditAnimal
);
