import Navigation from "./components/Navigation/Navigaion";
import "./App.css"
import Money from "./components/Money/Money";

import CashIssue from "./components/CashIssue/CashIssue";
import { useState } from "react";

let iWantToGet = (amountRequired, limits) =>{
  function collect(amount, nominals) {
     if(amount === 0) return {}
     if(!nominals.length) return
     let currentNominal = nominals[0]; // получаем сам номинал
    //  console.log(currentNominal)
     let availableNotes = limits[currentNominal] // получаем колличество номинала
     
     let notesNeeded = Math.floor(amount / currentNominal); // Получаем сколько купюр надо для на номинал
     let numberOfNotes = Math.min(availableNotes,notesNeeded) // колличество сколько всего есть номинала и сколько надо
     for(let i = numberOfNotes; i >= 0; i--){
      let result = collect(amount-i*currentNominal, nominals.slice(1)) 
      // вызывает функцию в которой колличество из наименьших чисел умножнает на значение купюры(1000), 
      //nominal.slice(1) - если купюр не обнаружено тогда ищет минимальное значение тут let numberOfNotes = Math.min(availableNotes,notesNeeded)
      if(result){
        return i ? {[currentNominal]: i, ...result} : result;
      }
     }
     
  }
   let nominals = Object.keys(limits).map(Number).sort((a,b)=>b - a)
   return collect(amountRequired, nominals)
}


 let limits = [
  {5000: 100, 2000: 400, 1000: 1000, 500 : 3000, 200: 5000, 100: 8000, 50: 10000}, 
  {5000: 476, 2000: 345, 1000: 6741, 500 : 4362, 200: 234, 100: 1643, 50: 3450}, 
  {5000: 234, 2000: 678, 1000: 845, 500 : 2451, 200: 9654, 100: 2345, 50:234}, 
  {5000: 546, 2000: 562, 1000: 2543, 500 : 4365, 200: 2154, 100: 124, 50: 342}, 
  {5000: 2732, 2000: 347, 1000: 479, 500 : 7556, 200: 3296, 100: 1257, 50: 3854}, 
  {5000: 73, 2000: 147, 1000: 279, 500 : 356,200: 696, 100: 857, 50: 854}
 ]

 let numbers = [1,2,3,4,5,6]

function App() {

const [inputCount, setInputCount] = useState('')
const [limit, setLimits] = useState({5000: 100, 2000: 400, 1000: 1000, 500 : 3000, 200: 5000, 100: 8000, 50: 10000})
const [objMoney, setObjMoney] = useState({})



function addCount(count){
  let obj = iWantToGet(count,limit)
  setInputCount(obj)
  setObjMoney(obj)
  if(inputCount === undefined){
    setInputCount('Купюр такого номинала нет')
  }
  compareObj(limit, obj)
}


function compareObj(obj1,obj2) {
 
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

let inputCurrent = []

let inputKeys = Object.keys(inputCount)
let inputValue = Object.values(inputCount)

for (let i = 0; i<=inputKeys.length-1;i++){
  let res = 'Вы получили ' + ' ' + inputValue[i] + ' ' +  'Номиналом ' + inputKeys[i]
  inputCurrent.push(res) 
}

let out = inputCurrent.map(el=>{
  return <div className='out-number'>{el}</div>
})



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
       </div>
       {out}
    </div>

  );
}

export default App;
