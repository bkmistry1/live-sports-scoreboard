;(function ($) {
	const submitButton = $('#submitSportChoice')

	submitButton.click(function (event) {
		event.preventDefault()

		var selectedSport = $('input[name="sport"]:checked').val()

		window.location.href = `/scoreboard_view_${selectedSport}`
	})
})(window.jQuery)
