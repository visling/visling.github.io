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
	divmiddle.id = toFind;
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

function toggleReverse(elements,className) {
	//Helper function to reset elements
	for (j=0; j<elements.length; j++) {
		elements[j].classList.toggle(className);
	}
}

//copied from Stockoverflow
function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
        els[i].classList[fnName](className);
    };
};


//Fetch all categories and produce KWIC
var children = document.getElementsByClassName("panel");
for (var i = 0; i < children.length; i++) {
	var toSearchIn = children[i].textContent;
	var toFind = children[i].id;
	var finds = findOccur(toSearchIn,toFind);
	createKWICDiv(toSearchIn,finds,toFind);
}



var middle = document.getElementsByClassName("divMiddle");
var panel = document.getElementsByClassName("panel");

//Accordion effect
//copied and modified from Stockoverflow
for (var i = 0; i < middle.length; i++) {
    middle[i].onclick = function() {
    	var rect = this.parentElement.getBoundingClientRect()
    	window.scrollTo(rect.left, rect.top);
    	//open/close selected category
        var setClasses = !this.classList.contains('active');
        setClass(middle, 'active', 'remove');
        setClass(panel, 'show', 'remove');

        for (var j = 1; j < this.children.length; j++) {
        	this.children[j].classList.toggle("hide");
       	};

        //reset all other
        if (setClasses) {
            this.classList.toggle("active");
            this.parentElement.nextElementSibling.classList.toggle("show");
            for (var k = 0; k < middle.length; k++) {
            	if (middle[k] != this) {
            		var children = middle[k].children;
            		setClass(children,"hide", "remove");
            	};
            };
        };
    };
};


//Random number of displayed kwics per category
for (i = 0; i < middle.length; i++) {
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
		pre[j].style.display = "none";
		keyw[j].style.display = "none";
		post[j].style.display = "none";
	}
};


//every category different color hue
var hues = ["#ff0066","#ffa439"];
var hue = "";
for (var c = 0; c < middle.length; c++) {
	var rndm = Math.floor(getRandomArbitrary(0,hues.length));
	while (hue == hues[rndm]) {
		//avoiding same color as neighbor category
		rndm = Math.floor(getRandomArbitrary(0,hues.length));
	}
	hue = hues[rndm];
	var titles = middle[c].getElementsByTagName("P");
	for (var i = 0; i < titles.length; i++) {
		if (titles[i].parentElement.className == "divMiddle") {
			titles[i].style.color = hue;
		}
	}
}



