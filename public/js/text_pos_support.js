text_pos_support = {

    // Position Configuration: set as necessary
    positions : {
        announcement: {
            left: 385,
	        top: 600,
	        width: 60
        },
        brb: {
            left: 385,
	        top: 710,
	        width: 60
        },
        livechat: {
            left: 90,
	        top: 440,
	        width: 60
        }
    },

    setPosition(name) {
        const pos = this.positions[name];

        $("#centered-content").css({
            position: "absolute",
            left: pos.left + "px",
            top: pos.top + "px",
            width: pos.width + "%",
            align: "center"
        });
    },

    resetPosition() {
        $("#centered-content").css({
            position: "",
            left: "",
            top: "",
            align: "center",
            width: "100%"
        });

        $(".container").css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        });
    }
};