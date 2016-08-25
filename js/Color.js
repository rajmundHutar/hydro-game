function Color(r, g, b, a) {
    this.r = Math.max(Math.min(r, 255), 0);
    this.g = Math.max(Math.min(g, 255), 0);
    this.b = Math.max(Math.min(b, 255), 0);
    this.a = !a ? 1 : Math.max(Math.min(a, 255), 0);

    this.getRgba = function() {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }

    this.getHexHelp = function(num) {
        var ret = num.toString(16).toUpperCase();
        return ret.length === 2 ? ret : "0" + ret;
    }

    this.getHex = function() {
        return "#" + this.getHexHelp(this.r) + "" + this.getHexHelp(this.g) + "" + this.getHexHelp(this.b);
    }
}

var COLORS = {
    BLUE: new Color(0, 0, 255, 1),
    RED: new Color(255, 0, 0, 1),
    GREEN: new Color(0, 99, 0, 1),
    YELLOW: new Color(255, 255, 0, 1),
    ORANGE: new Color(255, 102, 0, 1),
    WHITE: new Color(255, 255, 255, 1),
    BLACK: new Color(0, 0, 0, 1),
    LIME: new Color(0, 255, 0, 1)
}
