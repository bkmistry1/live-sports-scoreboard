(($) => {
    const socket = io(window.location.origin);

    socket.on("text_overlay_alignment", (alignment) => {
        console.log("Received alignment:", alignment);
        $("#centered-content").css("text-align", alignment);
    });

})(window.jQuery);