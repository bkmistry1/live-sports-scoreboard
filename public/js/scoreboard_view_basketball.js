;(function ($) {
	var baseUrl = window.location.origin

	const socket = io(baseUrl)

	socket.on('score_basketball', scoreObj => {
		let basketballScore1 = $('#basketballScore1')
		let basketballScore2 = $('#basketballScore2')

		basketballScore1.val(scoreObj.basketballTeam1)
		basketballScore2.val(scoreObj.basketballTeam2)
	})

	socket.on('teamNameUpdate', (data) => {
		let basketballTeam = $(`#${data.id}`)

		basketballTeam.val(data.value)
	})

	socket.on('updateHeader', data => {
		const basketballHeader = `#${data.id}`
		
		basketballHeader.val(data.value)
	})
})(window.jQuery)
