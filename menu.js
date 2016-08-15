
var puncts = ["!",".","?"];

function findOccur(toSearchIn,toFind) {
	/*Find all occurences of string toFind in string to SarchIn*/
	var start = 0;
	var finds = [];
	var toFindLen = toFind.length;
	while ((index = toSearchIn.indexOf(toFind,start)) > -1) {
		finds.push(index);
		start = index+toFindLen;
	}
	return finds;
}

function createKWICDiv(toSearchIn, finds) {
	/*Create a new Div container for given keyword*/
	var divLeft = document.createElement("div");
	divLeft.className = "divLeft";
	var divMiddle = document.createElement("div");
	divMiddle.className = "divMiddle";
	divMiddle.addEventListener("click", function() {
           window.location = "visual.html";
});
	var divRight = document.createElement("div");
	divRight.className = "divRight";


}


//find visual linguistics
var visual = "This is a test for Visual Linguistics. The project Visual Linguistics is great. This is a sentence without the words I am looking for. Visual Linguistics is led by Noah Bubenhofer. And this is an empty one too. In Visual Linguistics we have fun."
var divleft = document.createElement("div");
divleft.className = "divLeft";
var divmiddle = document.createElement("div");
divmiddle.className = "divMiddle";
divmiddle.addEventListener("click", function() {
    window.location = "visual.html";
});
var divright = document.createElement("div");
divright.className = "divRight";

var toFind = "Visual Linguistics";

var finds = findOccur(visual,toFind);
var puncts = findOccur(visual,"."); //to stop at puncts

//enter text in divs
finds.forEach(function(index,i) {
	//prefix
	var prefix = document.createElement("p");
	if (visual[index-2] == "." || visual[index-2] == "!"){
		prefix.textContent = ""
	}
	else {
		prefix.textContent = visual.substring(index-20,index);	
	}
	divleft.appendChild(prefix);

	//middle
	var middle = document.createElement("p")
	middle.textContent = toFind;
	divmiddle.appendChild(middle);

	//postfix
	var postfix = document.createElement("p")
	if (visual[index+toFind.length] == ".") {
		postfix.textContent = "."
	} else {
		postfix.textContent = visual.substring(index+toFind.length, index+toFind.length+20);
	}
	divright.appendChild(postfix);
});
var master = document.createElement("div");
master.className = "divMaster";
master.appendChild(divleft);
master.appendChild(divmiddle);
master.appendChild(divright);
document.body.appendChild(master);


// document.body.appendChild(divleft);
// document.body.appendChild(divmiddle);
// document.body.appendChild(divright);


