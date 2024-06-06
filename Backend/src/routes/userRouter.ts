const Router = require('express');
const router = Router();


router.get('/', (req, res) => {
    res.send('welcome to the users part')
  });


module.exports=router;