function Point(x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);

    this.equal = function(sndPoint) {
        if (sndPoint.x === this.x && sndPoint.y === this.y) {
            return true;
        }
        return false;
    }

    this.distance = function(sndPoint) {
        var ret = Math.sqrt(Math.pow(Math.abs(sndPoint.x - this.x), 2) + Math.pow(Math.abs(sndPoint.y - this.y), 2));
        return ret;
    }

    this.getMiddle = function(point) {
        return new Point((point.x + this.x) / 2, (point.y + this.y) / 2);
    }

    this.getAngle = function(point) {
        var a = this.x - point.x;
        var b = this.y - point.y;
        var tan = Math.atan(b / a);
        return tan * 180 / Math.PI;
    }
    this.draw = function() {
        return "[" + this.x + "; " + this.y + "]";
    }
}
