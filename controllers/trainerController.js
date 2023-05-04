const connection = require("../config/db");
const bcrypt = require("bcrypt");
const { main } = require("../config/nodemailer");

class TrainerController {
  //   Muestra el formulario de registro
  viewRegisterForm = (req, res) => {
    res.render("register", { message: "" });
  };

  // Muestra a todos los entrenadores
  viewAllTrainers = (req, res) => {
    let sql = `SELECT * FROM trainer order by trainer_name asc`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allTrainers", { result, message: "" });
    });
  };

  //   Registra un nuevo entrenador
  register = (req, res) => {
    let {
      trainer_name,
      last_name,
      country,
      phone,
      motivation,
      email,
      password,
    } = req.body;
    let img = "";
    if (req.file != undefined) {
      img = req.file.filename;
    } else {
      img = "trainer.png";
    }
    // Encriptamos contraseña
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;
      //   console.log(hash);
      let sql = `INSERT INTO trainer (trainer_name, last_name, country, phone, motivation, email, password, trainer_image) VALUES ("${trainer_name}", "${last_name}", "${country}","${phone}", "${motivation}", "${email}", "${hash}", "${img}")`;

      connection.query(sql, (error, result) => {
        console.log(error);
        // si da error
        if (error) {
          // si el error es por email duplicado
          if (error.code == "ER_DUP_ENTRY") {
            res.render("register", {
              message: "El email que has introducido ya existe.",
            });
          } else {
            // si es otro tipo de error
            throw error;
          }
        } else {
          let mail = `${email}`;
          main(mail);
          // si no da error
          res.render("register", {
            message:
              "¡Bienvenido! Tu perfil de entrenador se ha creado correctamente.",
          });
        }
      });
    });
  };

  //   Muestra la vista de perfil de un entrenador con sus perros
  viewOneTrainer = (req, res) => {
    let trainer_id = req.params.id;
    let sqlTrainer = `SELECT * FROM trainer WHERE trainer_id = ${trainer_id}`;
    let sqlAnimal = `SELECT * FROM animal WHERE trainer_id = ${trainer_id}`;

    connection.query(sqlTrainer, (errorTrainer, resultTrainer) => {
      if (errorTrainer) throw errorTrainer;

      connection.query(sqlAnimal, (errorAnimal, resultAnimal) => {
        if (errorAnimal) throw errorAnimal;
        res.render("oneTrainer", { resultTrainer, resultAnimal });
      });
    });
  };

  // Muestra el formulario de login
  viewLoginForm = (req, res) => {
    res.render("loginForm", { message: "" });
  };

  // Comprueba las credenciales de logueo
  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM trainer WHERE email = '${email}'`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length == 1) {
        // el email es correcto y comprobamos la contraseña
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (resultCompare) {
            // email y contraseña correctos
            res.redirect(`/trainer/oneTrainer/${result[0].trainer_id}`);
          } else {
            // email correcto, pero contraseña incorrecta
            res.render("loginForm", {
              message:
                "La contraseña ingresada es incorrecta, inténtalo de nuevo.",
            });
          }
        });
      } else {
        // como mínimo el email es incorrecto
        res.render("loginForm", {
          message:
            "No se encuentra ningún entrenador registrado con este email.",
        });
      }
    });
  };

  // Buscador
  searchTrainer = (req, res) => {
    let { word } = req.body;
    let sql = `SELECT * FROM trainer WHERE trainer_name like "%${word}%"`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      else {
        if (result != 0) {
          res.render("allTrainers", { result, message: "" });
        } else {
          // si es otro tipo de error
          res.render("allTrainers", {
            result,
            message: "No se han encontrado resultados para la búsqueda.",
          });
        }
      }
    });
  };
}

module.exports = new TrainerController();
