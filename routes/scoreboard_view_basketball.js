const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		return res.render('partials/scoreboard_view_basketball', {
			title: 'Basketball Scoreboard',
			shortcode: 'basketball_style',
			scoreboard: 'basketball.png',
		})
	} catch (e) {
		return res.status(500).json({ error: e })
	}
})

module.exports = router
