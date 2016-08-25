function Maze(width, height) {

    this.w = height;
    this.h = width;

    this.horiz = [];
    this.verti = [];

    this.generate = function () {
        var n = this.w * this.h - 1;
        if (n < 0) {
            throw("illegal maze dimensions");
            return;
        }

        for (var j = 0; j < this.w + 1; j++)
            this.horiz[j] = [];
        for (var j = 0; j < this.h + 1; j++)
            this.verti[j] = [],
                    here = [Math.floor(Math.random() * this.w), Math.floor(Math.random() * this.h)],
                    path = [here],
                    unvisited = [];
        for (var j = 0; j < this.w + 2; j++) {
            unvisited[j] = [];
            for (var k = 0; k < this.h + 1; k++)
                unvisited[j].push(j > 0 && j < this.w + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
        }
        while (0 < n) {
            var potential = [[here[0] + 1, here[1]], [here[0], here[1] + 1],
                [here[0] - 1, here[1]], [here[0], here[1] - 1]];
            var neighbors = [];
            for (var j = 0; j < 4; j++) {
                if (unvisited[potential[j][0] + 1][potential[j][1] + 1]) {
                    neighbors.push(potential[j]);
                }
            }
            if (neighbors.length) {
                n = n - 1;
                var next = neighbors[Math.floor(Math.random() * neighbors.length)];
                unvisited[next[0] + 1][next[1] + 1] = false;
                if (next[0] == here[0]) {
                    this.horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
                } else {
                    this.verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
                }
                path.push(here = next);
            } else {
                here = path.pop();
            }
        }
    }

    this.display = function () {
        var text = [];
        for (var j = 0; j < this.w * 2 + 1; j++) {
            var line = [];

            if (0 === j % 2) {
                for (var k = 0; k < this.h * 4 + 1; k++) {
                    var x = j / 2 - 1;
                    var y = Math.floor(k / 4);
                    if (0 === k % 4) {
                        line[k] = '+';
                    } else if (j > 0 && this.verti[x] !== undefined && this.verti[x][y]) {
                        line[k] = '&nbsp;';
                    } else {
                        line[k] = '-';
                    }
                }
            } else {
                for (var k = 0; k < this.h * 4 + 1; k++) {
                    var x = (j - 1) / 2;
                    var y = k / 4 - 1;
                    if (0 === k % 4) {
                        if (this.horiz[x][y]) {
                            line[k] = '&nbsp;';
                        } else {
                            line[k] = '|';
                        }
                    } else {
                        line[k] = '&nbsp;';
                    }
                }
            }
            text.push(line.join('') + '<br>\r\n');
        }
        return text.join('');
    }

    this.getNeighbors = function (point) {
        if (!(point instanceof Point)) {
            throw("Wrong argument");
        }
        this.checkPointInside(point);
        var ret = new Array();
        var up = point.y > 0 && this.verti[point.y - 1] !== undefined && this.verti[point.y - 1][point.x] !== undefined,
                down = this.verti[point.y] !== undefined && this.verti[point.y][point.x] !== undefined,
                right = this.horiz[point.y] !== undefined && this.horiz[point.y][point.x] !== undefined,
                left = point.x > 0 && this.horiz[point.y] !== undefined && this.horiz[point.y][point.x - 1] !== undefined;
        ret.push(up && new Point(point.x, point.y - 1));
        ret.push(right && new Point(point.x + 1, point.y));
        ret.push(down && new Point(point.x, point.y + 1));
        ret.push(left && new Point(point.x - 1, point.y));

        return ret;
    }

    this.findPath = function (pointA, pointB) {
        this.checkPointInside(pointA);
        this.checkPointInside(pointB);
        if (pointA.equal(pointB)) {
            return [];
        } else {
            var path = [];
            var workPoints = [];
            var visited = [];
            workPoints.push(pointA);
            path.push(pointA);
            var i = 0;
            while (true) {
                var work = path[path.length - 1];
                if (work.equal(pointB)) {
                    return path;
                }
                visited.push(work);
                var neighbors = this.getNeighbors(work);
                var add = false;
                if (neighbors.length > 0) {
                    for (var j = 0; j < neighbors.length; j++) {
                        if (!this.pointInArray(neighbors[j], visited)) {
                            path.push(neighbors[j]);
                            add = true;
                            break;
                        }
                    }
                }
                if (!add) {
                    path.pop();
                }
                i++;
            }
        }
    }

    this.checkPointInside = function (point) {
        if (point.x < 0 || point.y < 0 || point.x > this.h - 1 || point.y > this.w - 1) {
            throw("Point is not in bounders. (" + point.x + " != <0, " + (this.h - 1) + "> or " + point.y + " != <0, " + (this.w - 1) + ">");
        }
        return true;
    }
    
    this.pointInArray = function (point, array) {
        for (var i = 0; i < array.length; i++) {
            if (point.equal(array[i])) {
                return true;
            }
        }
        return false;
    }    

}
