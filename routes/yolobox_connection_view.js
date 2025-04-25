const express = require('express');
const router = express.Router();
const data = require('../data');
const websocketFunctions = data.websocketFunctions;

router.get('/', async (req, res) => {	
	try {
		await websocketFunctions.getDirectorList()
		await websocketFunctions.getMaterialList()
		await websocketFunctions.getMixerList()

		return res.json({
			data: 'nothing',
		})
	} catch (e) {
		console.log(e)
		return res.status(500).json({ error: e });
	}
});

module.exports = router;
