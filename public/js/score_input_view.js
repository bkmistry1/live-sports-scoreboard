(function ($) {
	
	const socket = io();
  
	const button1 = $("#button1");
	const button2 = $("#button2");

	const score1 = $("#score1");
	const score2 = $("#score2");

	button1.click(function (event) {
		event.preventDefault();

		let score = parseInt(score1.val());
		score++;
		score1.val(score.toString());

		let scoreObj = {};

		scoreObj.team1 = score1.val();
		scoreObj.team2 = score2.val();

		socket.emit('scoreboard', scoreObj);		
	});

	button2.click(function (event) {
		event.preventDefault();

		let score = parseInt(score2.val());
		score++;
		score2.val(score.toString());

		let scoreObj = {};

		scoreObj.team1 = score1.val();
		scoreObj.team2 = score2.val();

		socket.emit('scoreboard', scoreObj);		
	});	

	

})(window.jQuery);
