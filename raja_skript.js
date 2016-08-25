/*
Tento javascriptový kód je můj vlastní.
Pokud ho chcete použít je šířen pod licencí:
Uveďte autora-Neužívejte dílo komerčně-Zachovejte licenci 3.0 Česko
http://creativecommons.org/licenses/by-nc-sa/3.0/cz/
Jaroslav "Rajmund" Hutař

*/ 

raja = new fce();
function fce() {
    this.version = "1.3";
    this.rotate = function (id, uhel) {  
        document.getElementById(id).style.WebkitTransform="rotate("+uhel+"deg)";
        document.getElementById(id).style.MozTransform="rotate("+uhel+"deg)";
        document.getElementById(id).style.OTransform="rotate("+uhel+"deg)";
        //document.getElementById(id).style.-ms-transform="rotate("+uhel+"deg)";
        }
     this.bubble_down = function(pole){
        /**
         * param pole
         *
         * return sorted pole with bubblesort down         
         */
        var x,newn;
        n=pole.length;
        while (n > 1) {
            newn=0;
            for (i=0;i<(n-1);i++){
                if (pole[i]<pole[i+1]) {
                    x=pole[i];
                    pole[i]=pole[i+1];
                    pole[i+1]=x;
                    newn=i;
                    }
                }
            n=newn+1;
            }
        }
    this.bubble = function(pole){
        /**
         * param pole
         *
         * return sorted pole with bubblesort         
         */ 
        var x,newn;
        n=pole.length;
        while (n > 1) {
            newn=0;
            for (i=0;i<(n-1);i++){
                if (pole[i]>pole[i+1]) {
                    x=pole[i];
                    pole[i]=pole[i+1];
                    pole[i+1]=x;
                    newn=i;
                    }
                }
            n=newn+1;
            }
        }
    this.array = function(pole){
        /**
         * param pole
         *
         * return pole         
         */ 
        var vys="";
        n=pole.length;
        for (i=0;i<n;i++){
            if (i!=n) vys+=pole[i]+" ";
            else vys+=pole[i]; 
            }
        return vys;
        }
    this.remove = function(pole,prvek){
        /**
         * param pole
         * param prvek         
         *
         * return remove prvek from pole and retrun new array         
         */ 
        for (i=0;i<=pole.length-1;i++) {
            if (prvek==pole[i]) smaz=i;
            }
        p1 = pole.slice(0,smaz);
        p2 = pole.slice(smaz+1,pole.length); 
        p3 = p1.concat(p2);
        return p3;           
    }
    this.isinarray = function(array,prvek){
        /**
         * param array
         * param prvek         
         *
         * return true if prvek is in array         
         */                                   
        var obsahuje=false;
        var index = 0;
        var i=0;
        while (i<=array.length && obsahuje==false) {
            if (prvek==array[i]) {
                obsahuje = true;
                index = i;    
            }
            i++;
        }
        if (obsahuje==true) return index;
        else return -1;
    }
    this.BinToDec = function(dec,num){
        /**
           * param dec
           * param num           
           *                       
           * return 
           */
        var bin="";
        var st = 1;
        while (dec/st>1) st*=2;
        st = (Math.pow(2,num--)>(st/2) ? Math.pow(2,num--) : (st/2));
        for (var i=st;i>=1;i/=2){
            bin = bin + Math.floor(dec / i)+"";
            dec = (dec/i < 1 ? dec : ((dec/i)-1)*i);
        }
        return bin;          
    }
  this.isInt = function(input){
      /**
           * param input
           *                       
           * return true if input is int (without point)
           */
      //var RE = /^-{0,1}\d*\.{0,1}\d+$/;
      var RE = /^\d+$/;
      return (RE.test(input));
  } 
  this.isDefined = function(variable){
      return (typeof(window[variable]) == "undefined")?  false: true;
  } 
  this.rand = function (){
      if (arguments.length == 1){
          /**
           * param max
           *                       
           * return random number from 0 to max
           */
          var max = arguments[0];
          if (typeof max == "number") return Math.ceil(Math.random()*max);
          else alert("Raja exception: Insert number to fuction rand;");
      } 
      else if (arguments.length == 2){
          /**
           * param min
           * param max
           *            
           * return random number from min to max
           */
          
          if (typeof arguments[0] == "number" && typeof arguments[1] == "number") {
              if (arguments[0]<arguments[1]){
                  var min = arguments[0] - 1;
                  var max = arguments[1];
              }
              else {
                  var min = arguments[1] - 1;
                  var max = arguments[0];
              }
              return Math.ceil(Math.random()*(max-min))+min;
          }
          else alert("Raja exception: Insert two numbers to fuction rand;");
      }
      else if (arguments.length == 3){
          //alert("tri "+arguments[0]+" "+arguments[1]+" "+arguments[2]);
          /**
           * param num 
           * param min
           * param max
           *            
           * return array containes num times random number from min to max
           */
          if (typeof arguments[0] == "number" && typeof arguments[1] == "number" && typeof arguments[2] == "number") {
              var num = arguments[0];
              var min = arguments[1]-1;
              var max = arguments[2];
              if (0 < num && num <= (max-min) && min <= max){
                  var pole = new Array;
                  while (pole.length<num){
                      var rand = Math.ceil(Math.random()*(max-min))+min;
                      if (!raja.isinarray(pole,rand)) pole.push(rand);
                  }
                  return pole;
              }
              else alert("Raja exception: min <= max; 0 < num <= (max-min)");
          }
          else alert("Raja exception: Insert three numbers to fuction rand;");
      }
      else {
          alert("Raja exception: Insert one, two or three numbers;");
      }      
      return 0;
  }   
  this.getUrlGet = function(){
      var vys = new Array();
      var attr_arr = document.location.href.split("?")[1].split("&");
      for (var i=0;i<attr_arr.length;i++){
          vys[attr_arr[i].split("=")[0]] = attr_arr[i].split("=")[1];    
      } 
      return vys;
  }
}
