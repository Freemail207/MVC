/**
 * Created by user on 20.11.2016.
 */
//0
function firstSelector(selector) {
    if(typeof selector!=="string"){
    console.log("Type of node= "+selector.nodeType);
    }else{
    var elements = document.querySelectorAll(selector);
    if (elements.length !== 0) {
        return elements;
    }
    else {
        return undefined;
    }
    }
}
//1
function secondSelector(selector) {
    var elements = document.querySelectorAll(selector);
    if (elements.length !== 0) {
        return elements[0];
    }
    else {
        return undefined;
    }
}
//2
function insertAfter(elem, nextSibling) {
    return nextSibling.parentNode.insertBefore(elem, nextSibling.nextSibling);
}
//3
function getOrAddAtribute(node, atribute, value) {
    if (value) {
        node.setAttribute(atribute, value);
    }
    else {
        try {
            node.getAttribute();
        }
        catch (err) {
            throw new Error("Sorry, no atribute");
        }
    }
}
//4
function createChess(){
    var parent=document.body;
    var mainContainer = document.createElement('div');
    var field=new Array(64);
    var setColor=false;
    var mainChild = document.createElement('div');
    mainContainer.setAttribute('style','width:320px; margin:auto;');
    mainChild.setAttribute('style', 'display:flex; flex-wrap:wrap;');
    for(var i=0; i<64; i++){
        field[i] = document.createElement('div');
        field[i].setAttribute('style','width:40px; height:40px;');
        if(setColor){
           field[i].setAttribute('style','background-color:black; width:40px; height:40px; color:white;');
            if((i+1)%8){
                setColor=!setColor;
            }
        }
        else{
            if((i+1)%8){
                setColor=!setColor;
            }

        }
        mainChild.appendChild(field[i]);
    }
    mainContainer.appendChild(mainChild);
    parent.appendChild(mainContainer);
}
createChess();