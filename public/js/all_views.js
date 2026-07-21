(($) => {
    const baseUrl = window.location.origin;
	const socket = io(baseUrl);
    const sportViews = $('.sport-view');
    var isSoccer = true;
    var isFrisbee = false;
    var isBasketball = false;
    var isVolleyball = false;

    socket.on("sport_type_change", (new_sport) => {
        console.log("Sport changed: " + new_sport);
        activateSportView(new_sport);
        isSoccer = new_sport === 'soccer';
        isFrisbee = new_sport === 'frisbee';
        isBasketball = new_sport === 'basketball';
        isVolleyball = new_sport === 'volleyball';
    })

    function activateSportView(sport) {
        sportViews.removeClass('is-active');
        const selectedView = sportViews.filter(`[data-sport="${sport}"]`);
        if (selectedView.length) {
            selectedView.addClass('is-active');
        }
    }

})(window.jQuery);