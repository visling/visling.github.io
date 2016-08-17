
// var puncts = ["!",".","?"];

function getClosestInt(givenInt, intList, pos) {
	/*Find the interger in intList closest to givenInt either before or 
	after depending on pos (True = before) */
	if (intList[0] >= givenInt) {
		return -2;
	}

	var i = 0;
	while (intList[i] < givenInt) {
			i++;
		}

	if (pos) {
		return intList[i-1];
	} else {
		return intList [i];
	}
}


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
	/*Create divs for given keyword*/

	//find visual linguistics
	
	var divleft = document.createElement("div");
	divleft.className = "divLeft";
	var divmiddle = document.createElement("div");
	divmiddle.className = "divMiddle";
	divmiddle.addEventListener("click", function() {
	    window.location = "visual.html";
	});
	var divright = document.createElement("div");
	divright.className = "divRight";

	var puncts = findOccur(toSearchIn,"."); //to stop at puncts  todo: foreach in puncts array find occur and add

	//enter text in divs
	finds.forEach(function(index,i) {
		//prefix
		var prefix = document.createElement("p");
		if (toSearchIn[index-2] == "." || toSearchIn[index-2] == "!"){
			prefix.textContent = "...";
		}
		else {
			var punctBefore = getClosestInt(index, puncts, true);
			prefix.textContent = toSearchIn.substring(punctBefore+2,index);	
		}
		divleft.appendChild(prefix);

		//middle
		var middle = document.createElement("p")
		middle.textContent = toFind;
		divmiddle.appendChild(middle);

		//postfix
		var postfix = document.createElement("p")
		if (toSearchIn[index+toFind.length] == ".") {
			postfix.textContent = "."
		} else {
			var punctAfter = getClosestInt(index+toFind.length-1,puncts,false);
			postfix.textContent = toSearchIn.substring(index+toFind.length, punctAfter+length+1);
		}
		divright.appendChild(postfix);
	});

	//create master div for easier CSS handling
	var master = document.createElement("div");
	master.className = "divMaster";
	master.appendChild(divleft);
	master.appendChild(divmiddle);
	master.appendChild(divright);
	document.body.appendChild(master);
}


var toFind = "Visual Linguistics";
var toSearchIn = "This is a test for Visual Linguistics. The project Visual Linguistics is great. This is a sentence without the words I am looking for. Visual Linguistics is led by Noah Bubenhofer. And this is an empty one too. In Visual Linguistics we have fun."
var finds = findOccur(toSearchIn,toFind);
createKWICDiv(toSearchIn,finds);

