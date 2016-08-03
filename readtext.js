window.onload = function() {
        // var fileInput = document.getElementById('fileInput');
        var DisplayArea = document.getElementById('displayArea');
        
        var reader = new FileReader();

        reader.onload = function(e) {
            fileDisplayArea.innerText = reader.result;
            reader.readAsText("visual_linguistics.txt");    
        });
}