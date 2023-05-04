const connection = require("../config/db");
class IndexController {
  // Muestra la vista home
  getAllTrainers = (req, res) => {
    let sql = `SELECT * FROM trainer order by trainer_id desc;`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("index", { result, message: "" });
    });
  };

  viewRegisterNews = (req, res) => {
    res.render("index");
  };

  registerNews = (req, res) => {
    let { news_mail } = req.body;
    let sql = `INSERT INTO newsletter (news_mail) VALUES ('${news_mail}');`;

    connection.query(sql, (error, resultado) => {
      if (error) {
        // si el error es por email duplicado
        if (error.code == "ER_DUP_ENTRY") {
          res.render("newsletter", {
            message:
              "El email que has introducido ya está suscripto al newsletter.",
          });
        } else {
          // si es otro tipo de error
          throw error;
        }
      } else {
        // si no da error
        res.render("newsletter", {
          message:
            "¡Gracias por suscribirte! Pronto recibirás noticias nuestras.",
        });
      }
    });
  };
}
module.exports = new IndexController();
