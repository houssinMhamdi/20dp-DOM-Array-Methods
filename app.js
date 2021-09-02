const main= document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

//fetch random user and add the money 
getRandomUser();
getRandomUser();
async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api')
   const data = await res.json()
   
   const user = data.results[0];
   const newUser = {
     name: `${user.name.first} ${user.name.last}`,
     money: Math.floor(Math.random()*1000000)
   }
   addData(newUser);


}
//sort money
function sortByRichest(){
   sort = data.sort((a,b)=>{
      
      return b.money - a.money;
   })
   updateDOM();
}
//show only mellionaires
function showMellionairs(){
   data = data.filter(item => item.money > 1000000);
   updateDOM();
}
//show only mellionaires
function callCulateTheAmount(){
  const wealth = data.reduce((item,num) => (item += num.money),0);
   console.log(formatmoney(wealth) );
   const wealthEl = document.createElement('div');
   wealthEl.innerHTML = `<h3><strong>Toatal Wealth : </strong> ${formatmoney(wealth)}</h3>`;
   main.appendChild(wealthEl);
}


//doble money

function doublemoeney(){
   data = data.map(item => {
   
   return {...item,money: item.money*2}

   
   });
   updateDOM();
}

function addData(userObj) {
   data.push(userObj);
   
   updateDOM();
}
function updateDOM(previdedData = data){
   //clear main div
   main.innerHTML = ' <h2><strong>Person</strong> Wealth</h2>';

   previdedData.forEach(item => {
      
      const element  = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong>${item.name}</strong> ${formatmoney(item.money)}`;
      main.appendChild(element);

   });
}

//Format numbers as money
function formatmoney(number){
   
   return "$"+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  

}

addUserBtn.addEventListener('click',getRandomUser);

doubleBtn.addEventListener('click',doublemoeney);
sortBtn.addEventListener('click',sortByRichest);
showMillionairesBtn.addEventListener('click',showMellionairs);
calculateWealthBtn.addEventListener('click',callCulateTheAmount);