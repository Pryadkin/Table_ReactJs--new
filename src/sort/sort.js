export default (data, nameColumn, direct) => {  
  
  data.sort((a, b) => { 
    let sortA = a;
    let sortB = b;
    if (direct !== 'abs') {  
      sortA = b;
      sortB = a;
    }
    
    if (isNaN(parseFloat(sortA[nameColumn]))) {            

      //sort for data.firstName, data.lastName, data.email
      if (sortA[nameColumn].toLowerCase() > sortB[nameColumn].toLowerCase()) { 
        return 1;
      } else return -1;       

    } else {        

      // sort for phone   
      if (sortA[nameColumn].toString().slice(0, 1) === '+') {   
        const aVar = parseFloat(sortA[nameColumn].slice(4, 7))
        const bVar = parseFloat(sortB[nameColumn].slice(4, 7))        
        return aVar - bVar         
      }        

      // sort for id
      return sortA[nameColumn] - sortB[nameColumn];  
    }     


  } )

}