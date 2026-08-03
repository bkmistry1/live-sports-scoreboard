(($) => {
    const socket = io(window.location.origin);

    socket.on("text_overlay_alignment", (alignment) => {
        console.log("Received alignment:", alignment);
        $("#centered-content").css("text-align", alignment);
    });

    socket.on("text_overlay_position", (position) => {
        console.log("Received position alignment:", position);
        switch(position)
        {
            case "announcement":
            case "brb":
            case "livechat":
                text_pos_support.setPosition(position);
                break;
            case "reset":
                text_pos_support.resetPosition();
                break;
            default:
                console.log("Unknown position received");
        }
        
    });

})(window.jQuery);