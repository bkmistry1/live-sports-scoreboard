const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('partials/controls', {
    title: 'Controls Center',
    shortcode: 'controls'
  });
});

router.get('/views', (req, res) => {
  res.render('partials/all_views', {
    title: 'All Views',
    shortcode: 'all_views'
  });
});

module.exports = router;
