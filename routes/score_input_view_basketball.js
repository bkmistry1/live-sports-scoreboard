const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		return res.render('partials/score_input_view_basketball', {
			title: 'Score Input View Basketball',
			shortcode: 'basketball_style',
			scoreboard: 'basketball.png',
		})
	} catch (e) {
		return res.status(500).json({ error: e })
	}
})

module.exports = router
