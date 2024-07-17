const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		return res.render('partials/scoreboard_view_frisbee', {
			title: 'Frisbee Scoreboard',
			shortcode: 'frisbee_style',
			scoreboard: 'scoreboardfrisBIG.png',
		})
	} catch (e) {
		return res.status(500).json({ error: e })
	}
})

module.exports = router
