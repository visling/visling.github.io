function readText() {
    paras = document.body.childNodes;
    for (var i = 0; i < paras.length; i++) {
        if (paras[i].nodeType == document.ELEMENT_NODE) {
            var output = ""; //placeholder for text output
            var filePath = paras[i].getAttribute("file")+".txt"
            if(filePath.files[0]) {           
                reader.onload = function (e) {
                    output = e.target.result;
                    displayContents(output);
                    };//end onload()
                reader.readAsText(filePath.files[0]);
            }  
        } 
    }
}

function displayContents(txt) {
        var el = document.getElementById('visuallinguistics'); 
        el.innerHTML = txt; //display output in DOM
}