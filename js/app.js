let List = [];

let database = firebase.database();
let ref = database.ref('todos');

function innerGotData (data) {
    let value = data.val();
    let array = [];
    if (value !==null) {
    let keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let text = value[k].text;
        let id = value[k].id;
        let item = { text, id, key: k };
        array.push(item)
    }}
    List = array;
    render();
}

function gotData(data) {
    innerGotData (data)
}

document.addEventListener("DOMContentLoaded", function() {
   
    ref.once('value', gotData);
    function gotData(data) {
        innerGotData (data)
    }
});

ref.on('value', gotData);

const list = document.querySelector("#list");
const input = document.querySelector("input");
const button = document.querySelector(".button");


function render() {
    list.innerHTML = '';
    let items = List.map(item => {
        return (`<li class="item">
        <i class="fa fa-check-circle complete"  ></i>
        <p 
        class="text"
        >${item.text}</p>
        <i class="fa fa-trash-o delete" key =${item.key} ></i>
        </li>`)
    })
    let str = items.join("");
    list.innerHTML = str;
    let trashes = document.getElementsByClassName("fa-trash-o");
    for (let i=0; i < trashes.length; i++){
        trashes[i].addEventListener("click", function(event) {
            let element = event.target;
            let key = element.attributes.key;
            
            
          firebase.database().ref('todos/key').remove();
          console.log(database.ref('todos'))
        })
    }
}

function addText () {
    let text = input.value;
    if (text !== ''){
        saveTodos(text);
        render();
    }
    input.value = '';
}

button.addEventListener('click', function () {
    addText () 
})

document.addEventListener("keyup", function(event){
    if (event.keyCode === 13) addText();
})

function saveTodos(text) {
    var newTodoRef = ref.push();
    newTodoRef.set({
        text,
        id: List.length
    })
}




    
