import Navigation from "./components/Navigation/Navigaion";
import "./App.css"
import Money from "./components/Money/Money";

import CashIssue from "./components/CashIssue/CashIssue";
import { useState } from "react";



let iWantToMoney = (amountRequired, limits) =>{
  function collect(amount, nominals) {
     if(amount === 0 || amount >= 40000000) return {}
   
     if(!nominals.length) return {}

     let currentNominal = nominals[0];
     let availableNotes = limits[currentNominal]
     let notesNeeded = Math.floor(amount / currentNominal);
     let numberOfNotes = Math.min(availableNotes,notesNeeded)
   
     for(let i = numberOfNotes; i >= 0; i--){
      let result = collect(amount - i*currentNominal, nominals.slice(1)) 
      
     if(result){
          return i ? {[currentNominal]: i, ...result} : result;}
     } 
    
  }
   let nominals = Object.keys(limits).map(Number).sort((a,b)=>b - a)
   return collect(amountRequired, nominals)
}




let limits = [
  {5000: 100, 2000: 400, 1000: 1000, 500 : 3000, 200: 5000, 100: 8000, 50: 100}, 
  {5000: 476, 2000: 345, 1000: 6741, 500 : 4362, 200: 234, 100: 1643, 50: 3450}, 
  {5000: 234, 2000: 678, 1000: 845, 500 : 2451, 200: 9654, 100: 2345, 50:234}, 
  {5000: 546, 2000: 562, 1000: 2543, 500 : 4365, 200: 2154, 100: 124, 50: 342}, 
  {5000: 2732, 2000: 347, 1000: 479, 500 : 7556, 200: 3296, 100: 1257, 50: 3854}, 
  {5000: 73, 2000: 147, 1000: 279, 500 : 356,200: 696, 100: 857, 50: 854}
 ]

 


let numbers = [1,2,3,4,5,6]

function App() {
const [flag, setFlag] = useState(false)
const [inputCount, setInputCount] = useState('')
const [limit, setLimits] = useState({5000: 100, 2000: 400, 1000: 1000, 500 : 3000, 200: 5000, 100: 8000, 50: 10000})
const [object, setObject] = useState({})


function addCount(count){
  let obj = iWantToMoney(count,limit)
  compareObj(limit, obj)
  setInputCount(obj)
  setObject(obj)
  setFlag(true)
 
  if(obj===undefined){setInputCount('Таких купюр нет')}
  console.log(obj)
}

function compareObj(obj1,obj2) {
  if(!obj2) return 
    let keys1 =  Object.keys(obj1).map(Number).sort((a,b)=>b - a)
    let keys2 = Object.keys(obj2).map(Number).sort((a,b)=>b - a)
    let key = keys1.filter(el => keys2.includes(el))
    for(let i = 0; i <= keys1.length-1; i++){
     let res = obj1[key[i]] - obj2[key[i]]
     if(key[i]){
      obj1[key[i]] = res
     }
    }
    setLimits(obj1) 
}

const btnsChange = numbers.map(el=>{
    return <button key={el} className="btns-change"  onClick={()=> setLimits(limits[el-1])}>{el}</button>
})


function isEmpty(object) {
  for (let key in object) {
    return false;
  }
  return true;
}

let moneyCounts =[];
let keysInp = Object.keys(inputCount).map(Number)
let valueInp = Object.values(inputCount).map(Number)

for(let i = 0; i<=keysInp.length-1; i++){
  let res = `Купюр номинала ${keysInp[i]} Выдано ${valueInp[i]}` 
  moneyCounts.push(res)
}

let moneyCount = moneyCounts.map(el=>{
  return <div className="description" key={el}>{el}</div>
})

let mooney = isEmpty(inputCount) ? 'Таких купюр нет' : moneyCount

let visibleMoney = flag ? mooney : null

return (
    <div >
       <Navigation  limit={limit}/>
       <div className="container" >
         <div className='desctiption'>Заполните банкомат купюрами</div>
          {btnsChange}
         <div className="container-input">
          <Money />
          <CashIssue addCount={addCount} />
         </div>
         <div className='description'>
         {visibleMoney}
         </div>
       </div>
    </div>
  );
}

export default App;
