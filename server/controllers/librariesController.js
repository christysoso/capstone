const knex = require('knex')(require('../knexfile').development);

exports.index = (req, res) => {
    knex('libraries')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving Libraries: ${err}`)
      );
  };

  exports.singleLibrary = (req, res) =>{
      knex('libraries')
      .where({ id: req.params.id }) //relates to /libraries:id route
      .then((data)=>{
          res.json(data);
      })
      .catch((err)=>{
          res.status(400)
          .send(`Error trying to obtain single library details ${err}`)
      })
  };

  exports.libraryBooks = (req, res) =>{
      knex('books')
      .where ( { library_id: req.params.id} ) //library id is equal to/is the params id
      .then((data)=>{
          res.json(data);
      })
      .catch((err)=>{
          res.status(400)
          .send(`Error trying to obtain library's books ${err}`)
      })
  }