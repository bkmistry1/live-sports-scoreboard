const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {

	try {

		return res.render('partials/score_input_view_soccer', {
			title: 'Score Input View Soccer',
			shortcode: 'soccer_style',
		});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

module.exports = router;
