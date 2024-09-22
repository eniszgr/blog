const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(!res.locals.user){
        return res.redirect('/error')
    }
   return  res.render('site/add');
});

module.exports = router;
