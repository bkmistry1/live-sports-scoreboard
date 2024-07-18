;(function ($) {
	var baseUrl = window.location.origin

	const socket = io(baseUrl)

	socket.on('score_frisbee', scoreObj => {
		let frisbeeScore1 = $('#frisbeeScore1')
		let frisbeeScore2 = $('#frisbeeScore2')

		frisbeeScore1.val(scoreObj.frisbeeTeam1)
		frisbeeScore2.val(scoreObj.frisbeeTeam2)
	})
})(window.jQuery)
