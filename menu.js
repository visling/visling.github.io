function getRandomArbitrary(min, max) {
	// Returns a random number between min (inclusive) and max (exclusive)
    return Math.random() * (max - min) + min;
}

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

function createKWICDiv(toSearchIn, finds,toFind) {
	/*Create divs for given keyword*/

	//find visual linguistics
	var divleft = document.createElement("div");
	divleft.className = "divLeft";
	var divmiddle = document.createElement("div");
	divmiddle.className = "divMiddle";
	var divright = document.createElement("div");
	divright.className = "divRight";

	var puncts = findOccur(toSearchIn,"."); //to stop at puncts  todo: foreach in puncts array find occur and add

	//enter text in divs
	finds.forEach(function(index,i) {
		//prefix
		var prefix = document.createElement("p");
		if (toSearchIn[index-2] == "." || toSearchIn[index-2] == "!"){
			prefix.textContent = "...";
			prefix.style.visibility = "hidden";
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
			var textContent = toSearchIn.substring(index+toFind.length, punctAfter)+" ."
			postfix.textContent = textContent;
		}

		divright.appendChild(postfix);
	});
	
	//create master div for easier CSS handling
	var master = document.createElement("div");
	master.className = "divMaster";
	// middle div parent of left and right, for CSS
	divmiddle.appendChild(divleft);
	divmiddle.appendChild(divright);
	// master.appendChild(divleft);
	master.appendChild(divmiddle);
	// master.appendChild(divright);

	// insert master div before the actual text
	var currentPanel = document.getElementById(toFind);
	document.body.insertBefore(master,currentPanel)
}

var children = document.getElementsByClassName("panel");
for (var i = 0; i < children.length; i++) {
	var toSearchIn = children[i].textContent;
	var toFind = children[i].id;
	var finds = findOccur(toSearchIn,toFind);
	createKWICDiv(toSearchIn,finds,toFind);
}


//go thru every keyword and generate random number 
//between 3-6 (use function get RandomArbitrary, siehe oben)to
//define how many "finds" with keyword should be rendered.
//if condition: if less available than minimum, allow less


var middle = document.getElementsByClassName("divMiddle");
var i;



for (i = 0; i < middle.length; i++) {
    middle[i].onclick = function(){
        var active = document.getElementsByClassName("active")
        this.classList.toggle("active");
        this.parentElement.nextElementSibling.classList.toggle("show"); //every other element with "show" in class needs to go back to hide
        for (i = 1; i < this.children.length; i++) {
        	this.children[i].classList.toggle("hide");
        }
    }
}

for (i = 0; i < middle.length; i++) {
	//Random number of displayed kwics per category
	var rndm = Math.floor(getRandomArbitrary(3,7));
	
	var pre = middle[i].getElementsByClassName("divLeft")[0].getElementsByTagName("P");
	var post = middle[i].getElementsByClassName("divRight")[0].getElementsByTagName("P");

	var allPs = middle[i].getElementsByTagName("P");
	var keyw = [];
	for (j=0;j<allPs.length;j++) {
		//get all keywords (middle)
		if (allPs[j].parentNode.className == "divMiddle") {
			keyw.push(allPs[j]);
		}
	}

	for (j=rndm; j < keyw.length; j++) {
		pre[j].style.visibility = "hidden";
		keyw[j].style.visibility = "hidden";
		post[j].style.visibility = "hidden";
	}
};
