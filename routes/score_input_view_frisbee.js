const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		return res.render('partials/score_input_view_frisbee', {
			title: 'Score Input View Frisbee',
			shortcode: 'score_input_view',
		})
	} catch (e) {
		return res.status(500).json({ error: e })
	}
})

module.exports = router
