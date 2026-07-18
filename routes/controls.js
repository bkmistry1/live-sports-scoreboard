const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('partials/controls', {
    title: 'Controls Center',
    shortcode: 'controls'
  });
});

module.exports = router;
