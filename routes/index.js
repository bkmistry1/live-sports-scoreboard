const volleyballScoreInputRoutes = require('./score_input_view_volleyball')
const volleyballScoreboardRoutes = require('./scoreboard_view_volleyball')
const frisbeeScoreboardRoutes = require('./scoreboard_view_frisbee')
const frisbeeScoreInputRoutes = require('./score_input_view_frisbee')
const basketballScoreboardRoutes = require('./scoreboard_view_basketball')
const basketballScoreInputRoutes = require('./score_input_view_basketball')
const soccerScoreboardRoutes = require('./scoreboard_view_soccer')
const soccerScoreInputRoutes = require('./score_input_view_soccer')
const liveChatTest = require('./live_chat')

const constructorMethod = app => {
	app.get('/', async (req, res) => {
		res.render('partials/landingPage', {
			title: 'Sportsfest Scoreboard',
			shortcode: 'landingPage',
		})
	})

	app.use('/score_input_view_volleyball', volleyballScoreInputRoutes)
	app.use('/scoreboard_view_volleyball', volleyballScoreboardRoutes)
	app.use('/scoreboard_view_frisbee', frisbeeScoreboardRoutes)
	app.use('/score_input_view_frisbee', frisbeeScoreInputRoutes)
	app.use('/scoreboard_view_basketball', basketballScoreboardRoutes)
	app.use('/score_input_view_basketball', basketballScoreInputRoutes)
	app.use('/scoreboard_view_soccer', soccerScoreboardRoutes)
	app.use('/score_input_view_soccer', soccerScoreInputRoutes)
	app.use('/live-video', liveChatTest)

	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not found' })
	})
}

module.exports = constructorMethod
