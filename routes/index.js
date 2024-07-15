const scoreInputRoutes = require('./score_input_view');
const scoreBoardRoutes = require('./scoreboard_view');

const constructorMethod = app => {
	app.get('/', async (req, res) => {
		res.render('partials/landingPage', {
			title: 'Sportsfest Scoreboard',
			shortcode: 'landingPage',
		});
	});

	app.use('/score_input_view', scoreInputRoutes);
	app.use('/scoreboard_view', scoreBoardRoutes);

	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not found' });
	});
};

module.exports = constructorMethod;
