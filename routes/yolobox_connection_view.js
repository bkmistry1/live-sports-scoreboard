const express = require('express');
const router = express.Router();
const data = require('../data');
const websocketFunctions = data.websocketFunctions;

router.get('/', async (req, res) => {	
	try {
		const finalData = await websocketFunctions.getDirectorList()

		return res.json({
			"data": finalData
		})
	} catch (e) {
		console.log(e)
		return res.status(500).json({ error: e });
	}
});

module.exports = router;
