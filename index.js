(function () {
    var preTag = document.getElementById('donut');

    // Angles, Radius and Contants
    var A = 1;
    var B = 1;
    var R1 = 1;
    var R2 = 2;
    var K1 = 150;
    var K2 = 5;

    // Função para renderizar quadro ASCII frame
    function renderAsciiFrame() {
        var b = []; // Matriz para permanecer caracteres ACII
        var z = []; // Matriz para armazenar valores de profundidade

        var width = 280; // Largura do quadro 
        var height = 160; // Altura do quadro

        A += 0.07; // Ângulo de aumento a
        B += 0.03; // Increament angle b
        // seno e coseno dos angulos
        var cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

    
        for (var k = 0; k < width * height; k++) { 
            b[k] = k % width == width - 1 ? '\n' : ' ';
            z[k] = 0;
        }

        
        for (var j = 0; j < 6.28; j += 0.07) {
            var ct = Math.cos(j); 
            var st = Math.sin(j); 

            for (var i = 0; i < 6.28; i += 0.02) {
                var sp = Math.sin(i); 
                cp = Math.cos(i), 
                    h = ct + 2, 
                    D = 1 / (sp * h * sA + st * cA + 5),
                    t = sp * h * cA - st * sA;

                
                var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                var y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

                
                var o = x + width * y;
                
                var N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

                
                if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;
                    
                    b[o] = '.,-~:;=!*#$@%123547854527859696514735'[N > 0 ? N : 0];
                }

            }

        }

        // Update html element with the ascii frame
        preTag.innerHTML = b.join('');

    }

    // Function to start the animation
    function startAsciiAnimation() {
        // Start it by calling renderAsciiAnimation every 50ms
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    }

    renderAsciiFrame(); // Render the initial ascii frame
    // Add event listener to start animation when page is loaded
    if (document.all) {
        // For older versions of internet explorer
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        // For modern browsers
        window.addEventListener('load', startAsciiAnimation, false);
    }

    // Add event listener to update ascii frame when window resized
    window.addEventListener('resize', renderAsciiFrame);
})();;