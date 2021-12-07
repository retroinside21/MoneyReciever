let iWantToGet = (amountRequired, limits) =>{
   
  function collect(amount, nominals) {
     if(amount === 0) return {}
     if(!nominals.length) return
   
     let currentNominal = nominals[0];
     let availableNotes = limits[currentNominal]
     let notesNeeded = Math.floor(amount / currentNominal);
     let numberOfNotes = Math.min(availableNotes,notesNeeded)
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

let limits = {1000:5,500:2,100:5,50:100,30:6};

console.log(iWantToGet(120,limits))

 