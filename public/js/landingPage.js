(($) => {
	const submitButton = $("#submitSportChoice");

	submitButton.click((event) => {
		event.preventDefault();

		const selectedSport = $('input[name="sport"]:checked').val();

		window.location.href = `/scoreboard_view_${selectedSport}`;
	});
})(window.jQuery);
