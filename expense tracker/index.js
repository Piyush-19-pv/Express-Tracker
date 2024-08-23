const blance = document.getElementById('blance');

const money_plus =document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text =document.getElementById('text');
const amount =document.getElementById('amount');




const localStorageTransactions = JSON.parse(localStorage.getItem("Transactions"));
let Transactions = localStorage.getItem("Transactions") !== null ? localStorageTransactions:[];

///add transaction

function addTransaction(e){
  e.preventDefault();
  if(
    text.value.trim()  ===  "" || 
    amount.value.trim() ===  ""
){
  alert("please enter text and value")
}else{

  const transaction ={
    id:generateID(),
    text:text.value,
    amount: +amount.value,
  };

  Transactions.push(transaction);
  addTransactionDOM(transaction);
  updatelocalstorage();
  updateValues();
  text.value="" ;
  amount.value ="";
}

}

//genrate id
function generateID(){
  return Math.floor(Math.random()* 100000000);
}





function addTransactionDOM(transaction){
const sign = transaction.amount< 0 ? "-" : "+";
const item = document.createElement("li");
item.classList.add(
    transaction.amount < 0 ? "minus" : "plus"
);

  item.innerHTML= `
  ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>)
  `;

  list.appendChild(item);
}
//removetranscation

function removeTransaction(id){
  Transactions =Transactions.filter(transaction => transaction.id !==id);
  updatelocalstorage();
  Init()
}
//updatefunction
function updateValues(){
  const amount = Transactions.map( transaction =>transaction.amount);
  const total=amount.reduce((acc, item)=>(acc += item),0)
  .toFixed(2);


  const income = amount.filter(item => item > 0)
  .reduce((acc,item) => (acc += item),0).
  toFixed(2);

  const expense = (
     amount.filter(item => item <0)
     .reduce((acc,item) =>(acc += item),0) 
     *- 1
  ).toFixed(2);

  blance.innerText=`$${total}`;
  money_plus.innerText =`$${income}`;
  money_minus.innerText =`$${expense}`;
}
//initapp
function Init(){
  list.innerHTML = "";
  Transactions.forEach(addTransactionDOM);
  updateValues();
}

///updatelocalstorage

function updatelocalstorage(){
  localStorage.setItem(
  "Transactions",
  JSON.stringify(Transactions)
  );
}

  // addTransactionDOM( Transactions); 
  Init();

  form.addEventListener("submit",addTransaction);


