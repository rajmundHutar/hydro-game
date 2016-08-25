$(function () {
    var game = new HydroGame();

    $(this).bind("contextmenu", function (e) {
        e.preventDefault();
    });
    $(document).on({
        mouseenter: function () {
            $(this).addClass("pipelineHover");
            game.setupColors();
        },
        mouseleave: function () {
            $(this).removeClass("pipelineHover");
            game.setupColors();
        },
        mousedown: function (event) {
            event.preventDefault();
            var idNode = $(event.target).parent().attr("data-idnode");
            switch (event.which) {
                case 1:
                    game.rotateNode(idNode, "+=90");
                    game.checkConect();
                    break;
                case 3:
                    game.rotateNode(idNode, "-=90");
                    game.checkConect();
                    break;
            }
        }
    }, "div.boxes");

    $("input#gameWidth", this).val(Math.floor($(window).width() / 100));
    $("input#gameHeight", this).val(Math.floor($(window).height() / 100));

    $('#dialog-message').modal('show');

    $("#playGame").click(function () {
        $(this).modal('hide');
        var w = $("input#gameWidth").val();
        var h = $("input#gameHeight").val();
        game.setSize(w, h);
        game.startGame();
    });
});