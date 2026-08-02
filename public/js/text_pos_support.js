text_pos_support = {

    // Position Configuration: set as necessary
    positions : {
        announcement: {
            left: 650,
	        top: 1200,
	        width: 60
        },
        brb: {
            left: 150,
	        top: 885,
	        width: 60
        },
        livechat: {
            left: 350,
	        top: 885,
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