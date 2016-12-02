var counterField = document.createElement('div');
counterField.setAttribute("style", "width:100px; height:100px; text-align:center; font-size:36px; border:1px solid black; margin:auto; margin-top:20px");
counterField.setAttribute("style", "width:100px; height:100px; text-align:center; font-size:36px; border:1px solid black; margin:auto; margin-top:20px");
counterField.setAttribute("class", "NewGame");
counterField.addEventListener('click', startNewGame);
/*
 * Main function
 * object initialization
 *
 * */
function fifteen() {
    var main = document.body;
    var elements = new Array(16);
    var mainContainer = document.createElement('div');
    var emptyElement = document.createElement('div');
    mainContainer.setAttribute('class', 'battle-field');
//random position of elements
    var arr = new Array(15);
    for (var i = 0; i < 15; i++) {
        arr[i] = i + 1;
    }
    arr.sort(compareRandom);
    mainContainer.setAttribute('style', 'width:408px; height:408px; margin:auto; border:1px solid black; display:flex; flex-wrap:wrap;');
    arr = addFifteen(mainContainer, elements, arr);
    main.appendChild(mainContainer);
    counterField.innerHTML = 'New Game';
    document.body.appendChild(counterField);
    mainContainer.addEventListener('click', function () {
        checkMove(event, arr)
    });


}
function compareRandom(a, b) {
    return Math.random() - 0.5;
}
/*
 * Create new field
 * elements - order array of div
 * node - main DIV
 * randomArray - random position of order elements
 * if localStorage is empty - create new field
 * Else - read from localStorage
 * */
function addFifteen(node, elements, randomArray) {
    var finalRandom = new Array();
    //     console.log(localStorage.getItem('flag'));
    //   var flag=localStorage.getItem('flag');
    if (localStorage.getItem(0) == null) {
        for (var i = 0; i < 15; i++) {
            elements[i] = document.createElement('div');
            elements[i].setAttribute("style", "width:100px; height:100px; text-align:center; font-size:36px; border:1px solid black;");
            elements[i].setAttribute("class", "number");
            elements[i].innerHTML = i + 1;

        }
        for (var j = 0; j < 15; j++) {
            var localI = randomArray[j];
            finalRandom.push(elements[localI - 1]);
            node.appendChild(elements[localI - 1]);
        }
        elements[15] = document.createElement('div');
        elements[15].setAttribute("style", "width:100px; height:100px; text-align:center; font-size:36px; border:1px solid black;");
        elements[15].innerHTML = "";
        node.appendChild(elements[15]);
        finalRandom.push(elements[15]);
    }
    else {
        for (var i = 0; i < 16; i++) {
            elements[i] = document.createElement('div');
            elements[i].setAttribute("style", "width:100px; height:100px; text-align:center; font-size:36px; border:1px solid black;");
            elements[i].setAttribute("class", "number");
            elements[i].innerHTML = localStorage.getItem(i);

        }
        for (var j = 0; j < 16; j++) {
            var localI = randomArray[j];
            finalRandom.push(elements[j]);
            node.appendChild(elements[j]);
        }
    }

    return finalRandom;
}
function findValue(array, value) {

    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return i;
    }

    return -1;
}
/*
* check the neighbors of event.target (concrete <div>)
* if position>3 - check the top element
* if position<12 - check the bottom element
* if some neighbors is empty - changing values: event.target=empty neighbors=event.target;
* Save array of value in localSorage after every step
* */
function checkMove(event, arr) {
    var localArr = new Array(16);
    var concretElem = event.target;
    var leftSibling = concretElem.previousElementSibling;
    var rightSibling = concretElem.nextSibling;
    for (var i = 0; i < localArr.length; i++) {
        localArr[i] = arr[i].innerHTML;
    }
    var position = findValue(localArr, concretElem.innerHTML);
    //check index
    if (position > 3) {
        var topSibling = arr[position - 4];
        if (!topSibling.innerHTML) {
            topSibling.innerHTML = concretElem.innerHTML;
            concretElem.innerHTML = '';

        }
    }
    if (position < 12) {
        var bottomSibling = arr[position + 4];

        if (!bottomSibling.innerHTML) {
            bottomSibling.innerHTML = concretElem.innerHTML;
            concretElem.innerHTML = '';

        }
    }
    if (leftSibling !== null && !leftSibling.innerHTML) {
        leftSibling.innerHTML = concretElem.innerHTML;
        concretElem.innerHTML = '';

    }
    if (rightSibling !== null && !rightSibling.innerHTML) {
        rightSibling.innerHTML = concretElem.innerHTML;
        concretElem.innerHTML = '';

    }
    saveInModel(localArr);
}

function saveInModel(arrayOfValue) {
    for (var i = 0; i < 16; i++) {
        localStorage.setItem(i, arrayOfValue[i]);
    }
    localStorage.setItem('flag', false);
}
function startNewGame() {
    var removeElement = document.getElementsByClassName('battle-field');
    localStorage.clear();
    document.body.removeChild(removeElement[0]);
    fifteen();
}
fifteen();