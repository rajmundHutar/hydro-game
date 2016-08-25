function HydroGame(width, height) {
    this.width = parseInt(width);
    this.height = parseInt(height);
    this.nodes = [];
    this.doneNodes = [];
    this.checkVisited = [];

    this.colors = {
        background: new Color(0, 79, 42),
        pipeline: new Color(255, 255, 255),
        connected: new Color(255, 213, 25),
        hover: new Color(24, 26, 36)
    }

    this.startTimer, this.timer, this.maze;

    if (typeof (Storage) !== "undefined") {
        var best = localStorage.getItem("bestScore");
        $("div.setup #bestScore").html(best + " points");
    }

    this.setSize = function (width, height) {
        this.width = !width ? 19 : Math.max(0, Math.min(40, width));
        this.height = !height ? 9 : Math.max(0, Math.min(40, height));
    }

    this.generateMaze = function () {
        this.maze = new Maze(this.width, this.height);
        this.maze.generate();

        for (var i = 0; i < this.width * this.height; i++) {
            var point = new Point(i % this.width, Math.floor(i / this.width));
            var neighb = this.maze.getNeighbors(point);
            var node = new Node(i % this.width, Math.floor(i / this.width));
            node.setNeighbors(neighb);
            node.setId(i);
            this.nodes[i] = node;
        }

        this.echoNodes();
        this.shuffleMaze();
        this.checkConect();
    }

    this.startGame = function () {
        this.generateMaze();
        var size = Math.floor(($(window).width() * .98) / this.width);
        size = Math.max(40, Math.min(200, size));
        $("#playground").css("width", size * this.width);
        $("div.boxes").css({width: size, height: size});
        this.setupColors();
        this.startTime();
    }

    this.getNeighborNode = function (id, direction) {
        switch (direction) {
            case 0:
                return this.nodes[id - this.width];
                break;
            case 1:
                return this.nodes[id + 1];
                break;
            case 2:
                return this.nodes[id + this.width];
                break;
            case 3:
                return this.nodes[id - 1];
                break;
        }
    }

    this.shuffleMaze = function () {
        for (var i = 0; i < this.nodes.length; i++) {
            var rand = Math.floor(Math.random() * 4) * 90;
            if (rand) {
                this.rotateNode(i, ("+=" + rand));
            }
        }
    }

    /**
     * Fce ktera vykresluje obrazky do mrizky
     */
    this.echoNodes = function () {
        for (var i = 0; i < this.nodes.length; i++) {
            var shape = this.nodes[i].getShape();
            var divPipe = $("<div class='blocPipe mask" + shape + "'></div>");
            var divBoxes = $("<div class='boxes' data-idnode='" + i + "'></div>").html(divPipe);
            $("#playground").append(divBoxes);
            divBoxes.rotate(this.nodes[i].getAngle());
        }
    }

    /**
     * fce ktera otoci obrazek a zjisti kdo je napojenej doprostred
     */
    this.rotateNode = function (id, angle) {
        this.nodes[id].rotate(angle);
        $("div.boxes[data-idnode=" + id + "]").rotate(this.nodes[id].getAngle());
    }

    /**
     * Fce ktera kontrolue  ktere prvky jsou pripojene
     *
     */
    this.checkConect = function () {
        this.checkVisited = [];
        $("div.boxes").removeClass("connected");
        var middle = Math.floor(this.height / 2) * this.width + Math.floor(this.width / 2);
        this.checkConectRecursive(middle);

        var ids = $.map(this.checkVisited, function (element, index) {
            if (element)
                return index
        })
        if (ids.length === this.width * this.height) {
            this.endGame();
        }
        $("[data-idnode='" + ids.join("'],[data-idnode='") + "']").addClass("connected");
        this.setupColors();
    }


    this.checkConectRecursive = function (id) {
        this.checkVisited[id] = true;
        var neighbors = this.nodes[id].getNeighbors();
        for (var direction = 0; direction < 4; direction++) {
            direction = parseInt(direction);
            if (neighbors[direction] !== false) {
                var neighborNode = this.getNodeByPoint(neighbors[direction]);
                if (neighborNode && this.checkConnectedNodes(id, neighborNode.getId()) && this.checkVisited[neighborNode.getId()] === undefined) {
                    this.checkConectRecursive(neighborNode.getId());
                }
            }
        }
    }

    this.checkConnectedNodes = function (id1, id2) {
        if (id1 - 1 === id2) {
            return this.nodes[id1].getNeighbors()[3] !== false && this.nodes[id2].getNeighbors()[1] !== false;
        } else if (id1 + 1 === id2) {
            return this.nodes[id1].getNeighbors()[1] !== false && this.nodes[id2].getNeighbors()[3] !== false;
        } else if (Math.abs(id1 - id2) === this.width && id1 - id2 > 0) {
            return this.nodes[id1].getNeighbors()[0] !== false && this.nodes[id2].getNeighbors()[2] !== false;
        } else if (Math.abs(id1 - id2) === this.width && id1 - id2 < 0) {
            return this.nodes[id1].getNeighbors()[2] !== false && this.nodes[id2].getNeighbors()[0] !== false;
        }
        return false;
    }

    this.getNodeByPoint = function (point) {
        if (point.y * this.width + point.x < 0 || point.y * this.width + point.x >= this.width * this.height) {
            return false;
        }
        return this.nodes[point.y * this.width + point.x];
    }

    this.startTime = function () {
        this.startTimer = (new Date()).getTime();
        var game = this;
        this.timer = setInterval(function () {
            var sec = Math.floor(((new Date()).getTime() - game.startTimer) / 1000);
            $("SPAN#time").html(game.formatTime(h = Math.floor(sec / 3600), Math.floor(sec / 60) - h * 60, sec % 60));
        }, 200);
    }

    this.endGame = function () {
        clearInterval(this.timer);

        var sec = Math.floor(((new Date()).getTime() - this.startTimer) / 1000);
        var time = this.formatTime(h = Math.floor(sec / 3600), Math.floor(sec / 60) - h * 60, sec % 60);
        if (typeof (Storage) !== "undefined") {
            var best = localStorage.getItem("bestScore");
            var score = Math.floor(((this.width * this.height * 10) - sec) / (this.width * this.height) * 1000) + (this.width * this.height);
            if (!best || score > best) {
                swal("Game Over", "Super, new best score: " + score + " points!\nYour time: " + time + "");
                localStorage.setItem("bestScore", score);
            } else {
                swal("Game Over", "Super, you finnished the game in time: " + time + " with score " + score + "!");
            }
        }
    }

    this.formatTime = function (h, m, s) {
        return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    this.setupColors = function () {
        $("body").css("background-color", this.colors.background.getRgba());
        $("div.boxes div.blocPipe").css("background-color", this.colors.pipeline.getRgba());
        $("div.boxes.connected div.blocPipe").css("background-color", this.colors.connected.getRgba());
        $("div.boxes.pipelineHover div.blocPipe").css("background-color", this.colors.hover.getRgba());
        $("div.setup").css("color", this.colors.pipeline.getRgba());
    }
}