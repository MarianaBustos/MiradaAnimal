const connection = require("../config/db");
class AnimalController {
  // Muestra todos los animales de todos los entrenadores

  viewAllAnimals = (req, res) => {
    let sql = `SELECT * FROM animal`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allAnimals", { result });
    });
  };

  // Muestra el formulario de crear un nuevo aniaml
  viewCreateAnimalForm = (req, res) => {
    let id = req.params.id;
    res.render("createAnimal", { trainer_id: id });
  };

  saveAnimal = (req, res) => {
    let trainer_id = req.params.id;
    let { animal_name, description } = req.body;

    let sql = `INSERT INTO animal (trainer_id, animal_name, description) VALUES (${trainer_id}, '${animal_name}', '${description}');`;
    if (req.file != undefined) {
      let img = req.file.filename;

      sql = `INSERT INTO animal (trainer_id, animal_name, description, animal_image) VALUES (${trainer_id}, '${animal_name}', '${description}', '${img}');`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };

  // Renderiza el formulario de crear obra de arte desde el navbar.
  addAnimalNavbar = (req, res) => {
    let sql = `SELECT trainer_name, last_name, trainer_id FROM trainer`;

    connection.query(sql, (error, result) => {
      if (error) throw error;

      res.render("addAnimalNavbar", { result });
    });
  };

  // Guarda la información de un animal desde el formulario del navbar
  // localhost:3000/art/addAnimalNavbar
  saveAnimalNavbar = (req, res) => {
    let { animal_name, description, trainer_id } = req.body;
    let sql = `INSERT INTO animal (trainer_id, animal_name, description) VALUES (${trainer_id}, '${animal_name}', '${description}');`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO animal (trainer_id, animal_name, description, animal_image) VALUES (${trainer_id}, '${animal_name}', '${description}', '${img}');`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/onetrainer/${trainer_id}`);
    });
  };

  // Elimina de manera real un animal
  delete = (req, res) => {
    let { animal_id, trainer_id } = req.params;

    let sql = `DELETE FROM animal WHERE animal_id = ${animal_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };

  // Renderiza la vista para editar un animal
  viewEditForm = (req, res) => {
    let animal_id = req.params.animal_id;
    let sql = `SELECT * FROM animal WHERE animal_id = ${animal_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editAnimal", { result });
    });
  };

  // Guarda la información editada de una obra
  saveEditAnimal = (req, res) => {
    let animal_id = req.params.animal_id;
    let trainer_id = req.params.trainer_id;
    let { animal_name, description } = req.body;
    let sql = `UPDATE animal SET animal_name = '${animal_name}', description = '${description}' WHERE animal_id = ${animal_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE animal SET animal_name = '${animal_name}', animal_image = '${img}' WHERE animal_id = ${animal_id}`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };
}

module.exports = new AnimalController();
