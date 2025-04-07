const express = require('express');
const router = express.Router();
const db = require('../db');
router.use(express.static('public'));

// INDEX ROUTE
router.get('/', (req, res) => {  
  const data = req.query.abcd; // Replace parameter name "query"
  
  if (data === undefined) {
    res.render('error'); // Render an error page if data is undefined
  } else { 

    res.render('index',{ data });

   }
});

    

module.exports = router;