<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="author" content="Jaroslav ,Rajmund, Hutař">
        
        <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />        
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/sweet-alert.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">
        
        <title>Hydro</title>
    </head>
    <body>
        <div class="setup">
            <div class=row>
                <div class="col-xs-6 col-lg-6">
                    Your time: <span id="time"></span>
                </div>
                <div class="col-xs-6 col-lg-6">
                    Best score: <span id="bestScore"></span>
                </div>
            </div>
        </div>

        <!-- Sart Game Modal -->
        <div class="modal fade" id="dialog-message" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">Select game size:</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Game width</label>
                            <input type="number" class="form-control" id="gameWidth" placeholder="Game width">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Game height</label>
                            <input type="number" class="form-control" id="gameHeight" placeholder="Game height">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="playGame" data-dismiss="modal">Play</button>
                    </div>
                </div>
            </div>
        </div>        

        <div id="playground"></div>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
        <script type="text/javascript" src="./js/jQueryRotate.2.1.js"></script>
        <script type="text/javascript" src="./js/bootstrap.min.js"></script>
        <script type="text/javascript" src="./js/sweet-alert.min.js"></script>

        <script type="text/javascript" src="./js/HydroGame.js"></script>
        <script type="text/javascript" src="./js/Node.js"></script>
        <script type="text/javascript" src="./js/Maze.js"></script>
        <script type="text/javascript" src="./js/Point.js"></script>
        <script type="text/javascript" src="./js/Color.js"></script>

        <script type="text/javascript" src="./js/Main.js"></script>
    </body>
</html>
