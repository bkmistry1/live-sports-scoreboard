const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {

	try {

		return res.render('partials/text_overlay_input_view', {
			title: 'Text Overlay Input View',
			shortcode: 'text_overlay_style',
		});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

module.exports = router;
