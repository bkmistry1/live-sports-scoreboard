const express = require('express');
const router = express.Router();
var io = require('socket.io-client')

router.get('/', async (req, res) => {
	try {

		return res.render('partials/scoreboard_view_volleyball', {
			title: 'Scoreboard',
			shortcode: 'volleyball_style',
			scoreboard: "scoreboardvball.png",
		});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

router.post('/', async (req, res) => {
	const matchInfo = req.body;
	const socket = io.connect("http://localhost:55483/")
	socket.emit("scoreboard_volleyball_change", req.body)

	return res.json({"done": true});
});

module.exports = router;
