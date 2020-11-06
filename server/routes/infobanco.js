const express = require('express');
const router = express.Router();
const Info_bancaria = require('../models/Info_bancaria');



router.get("/infobank/:id", async (req, res)=>{

  try{
      const todas = await Info_bancaria.findAll({where: {id_usuario: req.params.id}})
      .then(result =>{
          //console.log(result);
          res.json(result);
          //console.log(res.json(result));
      })

  }catch(err){
      console.error(err)
      console.log(err);
  }
})

module.exports = router;
