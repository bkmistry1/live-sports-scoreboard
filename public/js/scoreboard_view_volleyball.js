;(function ($) {
	var baseUrl = window.location.origin

	const socket = io(baseUrl)

	socket.on('score_volleyball', scoreObj => {
		let score1 = $('#score1')
		let score2 = $('#score2')
		
		let team1 = $('#team1')
		let team2 = $('#team2')		

		let set1 = $('#set1')
		let set2 = $('#set2')

		score1.val(scoreObj.team1)
		score2.val(scoreObj.team2)

		team1.val(scoreObj.teamName1)
		team2.val(scoreObj.teamName2)		

		set1.val(scoreObj.set1)
		set2.val(scoreObj.set2)				

	})
})(window.jQuery)
