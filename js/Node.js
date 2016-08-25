function Node(in_x, in_y) {
    this.x = in_x;
    this.y = in_y;

    this.angle = 0;
    this.shape;
    this.neighbors = [0, 0, 0, 0];

    this.rotate = function (uhel) {
        uhel = uhel + ""; //make string
        var origAngle = this.angle;
        if (uhel.indexOf("=") >= 0) {
            var znamenko = uhel.split("=")[0];
            uhel = parseFloat(uhel.split("=")[1]);
            this.angle = ((znamenko === "+" ? this.angle + uhel : this.angle - uhel) + 360) % 360;
        }
        else {
            this.angle = (parseFloat(uhel) + 360) % 360
        }

        for (var i = 90; i <= (this.angle - origAngle + 360) % 360; i += 90) {
            var tmp = this.neighbors[0];
            this.neighbors[0] = (this.neighbors[3] === false ? false : new Point(this.neighbors[3].x + 1, this.neighbors[3].y - 1));
            this.neighbors[3] = (this.neighbors[2] === false ? false : new Point(this.neighbors[2].x - 1, this.neighbors[2].y - 1));
            this.neighbors[2] = (this.neighbors[1] === false ? false : new Point(this.neighbors[1].x - 1, this.neighbors[1].y + 1));
            this.neighbors[1] = (tmp === false ? false : new Point(tmp.x + 1, tmp.y + 1));
        }
    }

    this.getPoint = function () {
        return new Point(this.x, this.y);
    }

    /**
     * Fce ktera vraci cislo tvaru
     *
     */
    this.computeShape = function () {
        var count = (this.neighbors[0] !== false) + (this.neighbors[3] !== false) + (this.neighbors[1] !== false) + (this.neighbors[2] !== false);
        if (count === 2 && (this.neighbors[0] === this.neighbors[2] || this.neighbors[1] === this.neighbors[3])) {
            count = 5;
        }
        this.shape = count;
    }

    /**
     * Fce ktera vraci jak je prvek otocenej
     *
     */
    this.computeAngle = function () {
        var shape = this.shape;

        var t = this.neighbors[0];
        var l = this.neighbors[3];
        var r = this.neighbors[1];
        var d = this.neighbors[2];
        var angle = 0;

        if (shape === 1) {
            if (l !== false) {
                angle = 0;
            } else if (t !== false) {
                angle = 90;
            } else if (r !== false) {
                angle = 180;
            } else if (d !== false) {
                angle = 270;
            }
        }
        else if (shape === 2) {
            if (l !== false && t !== false) {
                angle = 0;
            } else if (t !== false && r !== false) {
                angle = 90;
            } else if (r !== false && d !== false) {
                angle = 180;
            } else if (d !== false && l !== false) {
                angle = 270;
            }
        }
        else if (shape === 3) {
            if (d === false) {
                angle = 0;
            } else if (l === false) {
                angle = 90;
            } else if (t === false) {
                angle = 180;
            } else if (r === false) {
                angle = 270;
            }
        }
        else if (shape === 4) {
            angle = 0;
        }
        else if (shape === 5) {
            if (l !== false && r !== false)
                angle = 0;
            else if (t !== false && d !== false)
                angle = 90;
        }

        this.angle = angle;
    }

    this.getId = function () {
        return this.id;
    }
    
    this.setId = function(id){
        this.id = id;
    }

    this.getAngle = function () {
        return this.angle;
    }

    this.getShape = function () {
        return this.shape;
    }

    this.setNeighbors = function (array) {
        this.neighbors = array;
        this.computeShape();
        this.computeAngle();
    }

    this.getNeighbors = function () {
        return this.neighbors;
    }

}