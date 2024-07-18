const scoreInputRoutes = require('./score_input_view')
const scoreBoardRoutes = require('./scoreboard_view')
const frisbeeScoreboardRoutes = require('./scoreboard_view_frisbee')
const frisbeeScoreInputRoutes = require('./score_input_view_frisbee')
const basketballScoreboardRoutes = require('./scoreboard_view_basketball')
const basketballScoreInputRoutes = require('./score_input_view_basketball')

const constructorMethod = app => {
	app.get('/', async (req, res) => {
		res.render('partials/landingPage', {
			title: 'Sportsfest Scoreboard',
			shortcode: 'landingPage',
		})
	})

	app.use('/score_input_view', scoreInputRoutes)
	app.use('/scoreboard_view', scoreBoardRoutes)
	app.use('/scoreboard_view_frisbee', frisbeeScoreboardRoutes)
	app.use('/score_input_view_frisbee', frisbeeScoreInputRoutes)
	app.use('/scoreboard_view_basketball', basketballScoreboardRoutes)
	app.use('/score_input_view_basketball', basketballScoreInputRoutes)

	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not found' })
	})
}

module.exports = constructorMethod
