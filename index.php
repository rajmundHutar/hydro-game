<?php
$G_X = isset($_GET["width"]) ? $_GET["width"] : false;
$G_Y = isset($_GET["height"]) ? $_GET["height"] : false;
?>
<SCRIPT>
    var G_START_TIME = new Date().getTime();
</SCRIPT>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="Content-Script-Type" content="text/javascript">
        <meta http-equiv="Content-Style-Type" content="text/css">
        <meta name="description" content="Popis stránek">
        <meta name="keywords" content="dulezita,slova,na,strance">
        <meta name="author" content="Jaroslav ,Rajmund, Hutař">
        <link rel="stylesheet" type="text/css" href="./style.css">
        <!--<link href="./obr/logo.jpg" rel="icon" type="image/png">-->
        <link type="text/css" href="./jquery/jquery-ui-1.8.17.custom/css/ui-lightness/jquery-ui-1.8.17.custom.css" rel="stylesheet">
        <script type="text/javascript" src="./jquery/jquery-ui-1.8.17.custom/js/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="./jquery/jquery-ui-1.8.17.custom/js/jquery-ui-1.8.17.custom.min.js"></script>
        <script type="text/javascript" src="./jquery/jQueryRotate.2.1.js"></script>
        <script type="text/javascript" src="./raja_skript.js"></script>
        <STYLE type="text/css">

        </STYLE>
        <title></title>
    </head>
    <body>
        <?php
        if ($G_X == false || $G_Y == false) {
            ?>
            <SCRIPT language="javascript" type="text/javascript">
        $(document).ready(function () {
            var scr_w = Math.floor($(document).width() / 50);
            var scr_h = Math.floor(($(document).height() - 30) / 50);
            $("a#ideal_size").attr("href", "?width=" + scr_w + "&height=" + scr_h);
            $("a#ideal_size").html("Hrát velikost " + scr_w + " na " + scr_h);
            $("span#ideal_text").html(scr_w + " na " + scr_h);
            $("a#vlastni_size").click(function (event) {
                event.preventDefault();
                var width = parseFloat($("#vlastni_width").val());
                var height = parseFloat($("#vlastni_height").val());
                if (width != 0 && width <= 40 && height != 0 && height <= 40) {
                    window.location.href = "?width=" + width + "&height=" + width;
                }
            });
        });
            </SCRIPT>
            <?php
            echo ('<DIV id="uvod">');
            echo ('<br><br>Ideální velikost pro tvůj monitor je: <SPAN id="ideal_text"></SPAN><br><br>');
            echo ('<A href="#" id="ideal_size"></A><br><br>');
            echo ('<br><br>Nebo můžete zvolit vlastní: <INPUT type="text" id="vlastni_width"> na <INPUT type="text" id="vlastni_height"><br><br>');
            echo ('<A href="#" id="vlastni_size">Hrát vlastní velikost</A><br><br>');
        } else {
            ?>
            <SCRIPT language="javascript" type="text/javascript">
                var GET = raja.getUrlGet();
                var G_X = GET["width"];
                var G_Y = GET["height"];
                var G_NODES = new Array();
                var G_DONE_NODES = new Array();
                var G_RECURSE = new Array();
                var G_START_TIMER;
                var G_TIMER;

                $(document).ready(function () {
                    $(this).bind("contextmenu", function (e) {
                        e.preventDefault();
                    });
                    $("DIV#playground").css("width", G_X * 50).css("height", G_Y * 50);
                    $('DIV.boxes IMG').mousedown(function (event) {
                        event.preventDefault();
                        switch (event.which) {
                            case 1:
                                rotateNode($(this), "+=90");
                                break;
                            case 3:
                                rotateNode($(this), "-=90");
                                break;
                        }
                    }).hover(function () {
                        if (!$(this).parent().hasClass("connected"))
                            $(this).parent().addClass("hover");
                    }, function () {
                        $(this).parent().removeClass("hover");
                    });
                    setupNodes();
                    var middleX = Math.floor(G_X / 2); //priklad 3/2 = 1,5 ~ 1 [0,1,2]
                    var middleY = Math.floor(G_Y / 2);

                    var addId = G_NODES[middleX][middleY].getId();
                    G_DONE_NODES.push(addId);

                    while (G_DONE_NODES.length != G_X * G_Y) { //zacinam vytvaret strom
                        var rand_node_id = G_DONE_NODES[Math.floor(Math.random() * (G_DONE_NODES.length))];//id nahodneho node z dokonceneho seznamu
                        var node_x = rand_node_id % G_X;//x a y souradnice nodu 
                        var node_y = Math.floor(rand_node_id / G_X);
                        var NODE = G_NODES[node_x][node_y]; //Object nahodneho nodu

                        var rand_neig = Math.floor(Math.random() * 4);  //nahodny soused

                        if (rand_neig == 0) { //nahodny soused naohre
                            if (NODE.neib_top == 1) { //node ma souseda nahore 
                                var neib = parseFloat(rand_node_id) - parseFloat(G_X); //id souseda nahore od node
                                //alert("0 - "+raja.array(G_DONE_NODES)+"\n"+rand_node_id+" - "+neib);
                                if (raja.isinarray(G_DONE_NODES, neib) < 0) { //jestli soused neni done
                                    G_DONE_NODES.push(neib); //pridavam souseda a node do splnenych
                                    var neib_x = neib % G_X; //x a y souradnice souseda 
                                    var neib_y = Math.floor(neib / G_X);
                                    var NEIB = G_NODES[neib_x][neib_y]; //Object souseda
                                    NODE.neib_top = 2; //nastaveni sousednosti
                                    NEIB.neib_dow = 2;
                                }
                            }
                        }
                        else if (rand_neig == 1) { //nahodny soused vpravo
                            if (NODE.neib_rig == 1) { //node ma souseda vpravo 
                                var neib = parseFloat(rand_node_id) + 1; //id souseda vpravo od node
                                //alert("1 - "+raja.array(G_DONE_NODES)+"\n"+rand_node_id+" - "+neib);
                                if (raja.isinarray(G_DONE_NODES, neib) < 0) { //jestli soused neni done
                                    G_DONE_NODES.push(neib); //pridavam souseda a node do splnenych
                                    var neib_x = neib % G_X; //x a y souradnice souseda 
                                    var neib_y = Math.floor(neib / G_X);
                                    var NEIB = G_NODES[neib_x][neib_y]; //Object souseda
                                    NODE.neib_rig = 2; //nastaveni sousednosti
                                    NEIB.neib_lef = 2;
                                }
                            }
                        }
                        else if (rand_neig == 2) { //nahodny soused dole
                            if (NODE.neib_dow == 1) { //node ma souseda dole
                                var neib = parseFloat(rand_node_id) + parseFloat(G_X); //id souseda dole od node
                                //alert("2 - "+raja.array(G_DONE_NODES)+"\n"+rand_node_id+" - "+neib);
                                if (raja.isinarray(G_DONE_NODES, neib) < 0) { //jestli soused neni done
                                    G_DONE_NODES.push(neib); //pridavam souseda a node do splnenych
                                    var neib_x = neib % G_X; //x a y souradnice souseda 
                                    var neib_y = Math.floor(neib / G_X);
                                    var NEIB = G_NODES[neib_x][neib_y]; //Object souseda
                                    NODE.neib_dow = 2; //nastaveni sousednosti
                                    NEIB.neib_top = 2;
                                }
                            }
                        }
                        else if (rand_neig == 3) { //nahodny soused vlevo
                            if (NODE.neib_lef == 1) { //node ma souseda vlevo
                                var neib = parseFloat(rand_node_id) - 1; //id souseda vlevo od node
                                //alert("3 - "+raja.array(G_DONE_NODES)+"\n"+rand_node_id+" - "+neib);
                                if (raja.isinarray(G_DONE_NODES, neib) < 0) { //jestli soused neni done
                                    G_DONE_NODES.push(neib); //pridavam souseda a node do splnenych
                                    var neib_x = neib % G_X; //x a y souradnice souseda 
                                    var neib_y = Math.floor(neib / G_X);
                                    var NEIB = G_NODES[neib_x][neib_y]; //Object souseda
                                    NODE.neib_lef = 2; //nastaveni sousednosti
                                    NEIB.neib_rig = 2;
                                }
                            }
                        }
                    }
                    echoNodes();
                    checkConect(middleX, middleY);
                    startTime();
                });






                //CLASS Node pro uchovani hodnot uzlu
                function Node(in_x, in_y) {
                    this.x = in_x;
                    this.y = in_y;

                    this.aktAngle = 0;

                    this.neib_top = in_y == 0 ? 0 : 1;
                    this.neib_rig = in_x == G_X - 1 ? 0 : 1;
                    this.neib_dow = in_y == G_Y - 1 ? 0 : 1;
                    this.neib_lef = in_x == 0 ? 0 : 1;

                    this.shape = 0;
                    this.rotateImg = function (uhel) {
                        uhel = uhel + "";
                        if (uhel.indexOf("=") >= 0) {
                            var znamenko = uhel.split("=")[0];
                            uhel = parseFloat(uhel.split("=")[1]);
                            this.aktAngle = znamenko == "+" ? (this.aktAngle + uhel) : (this.aktAngle - uhel);
                            if (this.aktAngle == -90)
                                this.aktAngle = 270;
                            else if (this.aktAngle == 360)
                                this.aktAngle = 0;
                            $("div#" + this.x + "x" + this.y + " img").rotate(this.aktAngle);//jQuery fce
                        }
                        else {
                            this.aktAngle = uhel % 360;
                            $("div#" + this.x + "x" + this.y + " img").rotate(uhel);//jQuery fce
                        }
                    }
                    /**
                     * Fce ktera vraci tvar v asci artu
                     *
                     */
                    this.show = function () {
                        var top = this.neib_top == 2 ? "oXo\n" : (this.neib_top == 1 ? "ooo\n" : "ooo\n");
                        var lef = this.neib_lef == 2 ? "X" : (this.neib_lef == 1 ? "o" : "o");
                        var rig = this.neib_rig == 2 ? "X\n" : (this.neib_rig == 1 ? "o\n" : "o\n");
                        var dow = this.neib_dow == 2 ? "oXo" : (this.neib_dow == 1 ? "ooo" : "ooo");
                        return top + (lef + "X" + rig) + dow;
                    }
                    /**
                     * Fce ktera alertuje tvar v asci artu
                     *
                     */
                    this.showAlert = function () {
                        alert(this.show());
                    }
                    /**
                     * Fce ktera vraci cislo tvaru
                     *
                     */
                    this.getShape = function () {
                        var count = (this.neib_top == 2 ? 1 : 0) + (this.neib_lef == 2 ? 1 : 0) + (this.neib_rig == 2 ? 1 : 0) + (this.neib_dow == 2 ? 1 : 0);
                        if (count == 2 && (this.neib_top == this.neib_dow || this.neib_rig == this.neib_lef)) {
                            count = 5;
                        }
                        this.shape = count;
                        return count;
                    }
                    /**
                     * Fce ktera vraci jak je prvek otocenej
                     *
                     */
                    this.getRotate = function () {
                        var shape = this.shape;

                        var top = this.neib_top;
                        var lef = this.neib_lef;
                        var rig = this.neib_rig;
                        var dow = this.neib_dow;

                        var angle = 0;

                        if (shape == 1) {
                            if (lef == 2)
                                angle = 0;
                            else if (top == 2)
                                angle = 90;
                            else if (rig == 2)
                                angle = 180;
                            else if (dow == 2)
                                angle = 270;
                        }
                        else if (shape == 2) {
                            if (lef == 2 && top == 2)
                                angle = 0;
                            else if (top == 2 && rig == 2)
                                angle = 90;
                            else if (rig == 2 && dow == 2)
                                angle = 180;
                            else if (dow == 2 && lef == 2)
                                angle = 270;
                        }
                        else if (shape == 3) {
                            if (dow == 0 || dow == 1)
                                angle = 0;
                            else if (lef == 0 || lef == 1)
                                angle = 90;
                            else if (top == 0 || top == 1)
                                angle = 180;
                            else if (rig == 0 || rig == 1)
                                angle = 270;
                        }
                        else if (shape == 4) {
                            angle = 0;
                        }
                        else if (shape == 5) {
                            if (lef == 2 && rig == 2)
                                angle = 0;
                            else if (top == 2 && dow == 2)
                                angle = 90;
                        }
                        return this.aktAngle - angle >= 0 ? this.aktAngle - angle : 360 + this.aktAngle - angle;
                    }
                    /**
                     * Fce ktera vraci id pozici
                     *
                     */
                    this.getId = function () {
                        return this.y * G_X + this.x;
                    }
                    /**
                     * Fce ktera vraci aktualni sousedy
                     *
                     */
                    this.getNeibs = function () {
                        //var vysledek = new Array(this.neib_top,this.neib_rig,this.neib_dow,this.neib_lef);
                        var sousedi = new Array(this.neib_top, this.neib_rig, this.neib_dow, this.neib_lef);
                        var uhel = G_NODES[this.x][this.y].getRotate();
                        //var vypis = G_NODES[inX][inY].show();
                        for (var i = 0; i < uhel / 90; i++) {
                            var tmp = sousedi[3];
                            sousedi[3] = sousedi[2];
                            sousedi[2] = sousedi[1];
                            sousedi[1] = sousedi[0];
                            sousedi[0] = tmp;
                        }
                        return sousedi;
                    }
                }
                /**
                 * Fce ktera vytvori prazdne 2D pole na objekty
                 *
                 */
                function setupNodes() {
                    for (var i = 0; i < G_X; i++) {
                        G_NODES[i] = new Array();
                        for (var j = 0; j < G_Y; j++) {
                            G_NODES[i][j] = new Node(i, j);
                        }
                    }
                }
                /**
                 * Vraci object podle id
                 */
                function getNodeById(id) {
                    var x = id % G_X;
                    var y = Math.floor(id / G_X);
                    return G_NODES[x][y];
                }
                /**
                 * Fce ktera vykresluje obrazky do mrizky
                 */
                function echoNodes() {
                    for (var y = 0; y < G_Y; y++) {
                        for (var x = 0; x < G_X; x++) {
                            var count = G_NODES[x][y].getShape();
                            $("DIV.boxes#" + x + "x" + y + " IMG").attr("src", "./obr/blok" + count + ".png");
                            var angle = raja.rand(0, 3) * 90;//G_NODES[x][y].getRotate();
                            G_NODES[x][y].aktAngle = angle;
                            $("DIV.boxes#" + x + "x" + y + " IMG").rotate(angle);
                        }
                    }
                }
                /**
                 * Fce ktera nahodne natoci prvky 
                 */
                function randomRotate() {
                    for (var y = 0; y < G_Y; y++) {
                        for (var x = 0; x < G_X; x++) {
                            $("DIV.boxes#" + x + "x" + y + " img").load(function () {
                                var poz = $(this).parent("div").attr("id").split("x");
                                var x = poz[0];
                                var y = poz[1];
                                var angle = G_NODES[x][y].getRotate();
                                G_NODES[x][y].rotateImg(angle);
                            });
                        }
                    }
                }
                /**
                 * fce ktera otoci obrazek a zjisti kdo je napojenej doprostred
                 *       
                 */
                function rotateNode(ele, angle) {
                    G_RECURSE = new Array();
                    $("DIV.boxes").removeClass("connected");
                    var X = ele.parent("div").attr("id").split("x")[0];
                    var Y = ele.parent("div").attr("id").split("x")[1];
                    //var ang = G_NODES[X][Y].rotate;
                    G_NODES[X][Y].rotateImg(angle);
                    //ele.rotate(G_NODES[X][Y].getRotate());
                    var middleX = Math.floor(G_X / 2); //priklad 3/2 = 1,5 ~ 1 [0,1,2]
                    var middleY = Math.floor(G_Y / 2);
                    checkConect(middleX, middleY);
                    return false;
                }
                /**
                 * Fce ktera kontrolue  ktere prvky jsou pripojene
                 *
                 */
                function checkConect(inX, inY) {
                    $("DIV.boxes#" + inX + "x" + inY).addClass("connected");
                    G_RECURSE.push(G_NODES[inX][inY].getId());
                    var sousedi = G_NODES[inX][inY].getNeibs();

                    if ($("DIV.connected").length == G_X * G_Y) {
                        clearTimeout(G_TIMER);
                        alert("Tvůj čas je: " + $("SPAN#time").html() + "s");
                    }
                    else {
                        if (sousedi[0] == 2 && inY - 1 >= 0) {
                            var sous_nahore = G_NODES[inX][inY - 1];
                            if (sous_nahore.getNeibs()[2] == 2 && raja.isinarray(G_RECURSE, sous_nahore.getId()) < 0)
                                checkConect(inX, inY - 1);
                        }
                        if (sousedi[1] == 2 && inX + 1 < G_X) {
                            var sous_vpravo = G_NODES[inX + 1][inY];
                            if (sous_vpravo.getNeibs()[3] == 2 && raja.isinarray(G_RECURSE, sous_vpravo.getId()) < 0)
                                checkConect(inX + 1, inY);
                        }
                        if (sousedi[2] == 2 && inY + 1 < G_Y) {
                            var sous_dole = G_NODES[inX][inY + 1];
                            if (sous_dole.getNeibs()[0] == 2 && raja.isinarray(G_RECURSE, sous_dole.getId()) < 0)
                                checkConect(inX, inY + 1);
                        }
                        if (sousedi[3] == 2 && inX - 1 >= 0) {
                            var sous_vlevo = G_NODES[inX - 1][inY];
                            if (sous_vlevo.getNeibs()[1] == 2 && raja.isinarray(G_RECURSE, sous_vlevo.getId()) < 0)
                                checkConect(inX - 1, inY);
                        }
                    }

                    //alert(sousedi);
                }
                function startTime() {
                    var promenna = new Date();
                    G_START_TIMER = Math.ceil(promenna.getTime() / 1000);
                    G_TIMER = setInterval("countTime()", 200);
                }
                function countTime() {
                    var promenna = new Date();
                    var akt_time = Math.ceil(promenna.getTime() / 1000);
                    var sec = akt_time - G_START_TIMER;
                    var h = Math.floor(sec / 3600);
                    var m = Math.floor(sec / 60);
                    var s = sec % 60;
                    $("SPAN#time").html((h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s));
                }
            </SCRIPT>

    <?php
    echo ('<DIV style="width:99%;height:30px;font-size:10pt;border:1px solid black;">
      Čas řešení:<SPAN id="time"></SPAN>
  </DIV>');
    echo ('<DIV id="playground">');
    for ($i = 0; $i < $G_Y; $i++) {
        for ($j = 0; $j < $G_X; $j++) {
            echo ('<DIV class="boxes" id="' . $j . 'x' . $i . '">
              <IMG src="./obr/blok1.png" name="0">
          </DIV>');
        }
        echo ("<br>\n");
    }
    echo ('</DIV>');
}
?>
    </body>
</html>
