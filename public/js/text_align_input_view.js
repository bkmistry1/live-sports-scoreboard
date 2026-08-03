$(function () {
    const socket = io(window.location.origin);

    function sendPosition(name)
    {
        socket.emit('text_overlay_pos', name);
    }

    // Alignment Buttons
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

    // Positioning Buttons
    $("#AnnPosBtn").click(function () {
       text_pos_support.setPosition("announcement");
       sendPosition("announcement");
    });

     $("#BrbPosBtn").click(function () {
        text_pos_support.setPosition("brb");
        sendPosition("brb");
    });

    $("#LiveChatPosBtn").click(function () {
        text_pos_support.setPosition("livechat")
        sendPosition("livechat");
    });

    $("#ResetPosBtn").click(function () {
       text_pos_support.resetPosition();
       sendPosition("reset");
    });
});

