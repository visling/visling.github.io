var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function entertext() {
    $.get("visuallinguistics.txt", function(response)) {
        var visling = response;
    }

    var p = document.createElement("p")
    p.className = "kwik"
    p.textContent = visling;
    document.body.appendChild(p);
}

entertext();