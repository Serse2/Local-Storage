const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
const selected = document.querySelector('#selected');
const deSelected = document.querySelector('#deselected')
const deleteAll = document.querySelector('#delete')

function addItem(e){
    e.preventDefault()
    //assegno il nome dell'item al valore dato in input
    let name = this.querySelector('[name="item"]').value
    //creo l'oggetto item
    const item = {
        name: name,
        done: false
    }
    //inserisco l'item creato nell'array items
    items.push(item)
    //richiamo la funzione per visualizzare gli item passando come parametri il mio array [items] e il luogo in cui voglio
    //visualizzare gli item ovvero itemList
    populateList(items, itemsList)
    //salviamo i dati inseriti nella lista nel localStorage
    //il primo parametro di setItem è la chiave che si trova nel localStorage
    //il secondo parametro è l'array che contiene la lista generata dall'utente
    //nel LocalStorage però viene convertito tutto in String e restituisce [object Object]
    //per rendere leggibili questi dati dobbiamo convertirlo in una string in formato Json con JSON.stringify()
    //applichiamo il metodo JSON.parse che analizza una stringa JSON, costruendo il valore JavaScript o l'oggetto descritto dalla stringa
    localStorage.setItem('items', JSON.stringify(items))
    //ripulisco il form dopo aggiunta dell'item
    this.reset()
}

//funzione per visualizzare gli items inseriti
//passiamo due parametri: il primo è un qualsiasi array contenente la lista di items
//il secondo è l'elemento html nel quale vogliamo far visualizzare la lista di items
function populateList(plates = [], platesList){
    platesList.innerHTML = plates.map((plate, i) =>{
        return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.name}</label>
        </li>
        `
    }).join('')
}

function toggleDone(e){
    if (!e.target.matches('input')) return //prendi in considerazione solo il valore input
    let el = e.target
    let i = el.dataset.index
    items[i].done = !items[i].done
    localStorage.setItem('items', JSON.stringify(items))
}


function selectAll(){
    items.forEach(item => {
        if (item.done == false){
        item.done = true
        }
    });
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
}

function deSelectAll(){
    items.forEach(item => {
        if (item.done == true){
        item.done = false
        }
    });
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
}

function deleteAllItems(){
    items = []
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
selected.addEventListener('click', selectAll);
deSelected.addEventListener('click', deSelectAll);
deleteAll.addEventListener('click', deleteAllItems)
populateList(items, itemsList);