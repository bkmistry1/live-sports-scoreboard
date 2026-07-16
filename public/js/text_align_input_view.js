$(function () {
    const socket = io(window.location.origin);
    
    $("#leftBtn").click(function () {
        $("#centered-content").css("text-align", "left");
        socket.emit("text_overlay_align", "left");
    });

    $("#centerBtn").click(function () {
        $("#centered-content").css("text-align", "center");
        socket.emit("text_overlay_align", "center");
    });

    $("#rightBtn").click(function () {
        $("#centered-content").css("text-align", "right");
        socket.emit("text_overlay_align", "right");
    });
});

