$(document).ready(function(){
var audio = new Audio('./sounds/tic.mp3');


  var colors = new Array(
            [62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]);

    var step = 0;
    var colorIndices = [0, 1, 2, 3];

    //transition speed
    var gradientSpeed = 0.002;

    function updateGradient() {
        if ($ === undefined) return;

        var c0_0 = colors[colorIndices[0]];
        var c0_1 = colors[colorIndices[1]];
        var c1_0 = colors[colorIndices[2]];
        var c1_1 = colors[colorIndices[3]];

        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";


        $('#layer polygon').css({
            fill: color1
        }, 2000);
        step += gradientSpeed;
        if (step >= 1) {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];
            colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

        }
    }
    setInterval(updateGradient, 10);

    function imageChange(){
      var i =0;
      $("#kfc").attr("src","./images/Swag_KFC.png");
      $("#buggerking").attr("src","./images/Swagger.png");

      function swag() {
      var cols = ["red","yellow","green","blue","purple"];
      if (i==5)
        i=0;
      $("#swag").css("background",cols[i]);
      i++;
      }

      setInterval(swag, 100);
    }

   $('#layer').one("click", function(){
      audio.play();
      imageChange();
   });
});
