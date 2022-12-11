const info = (...params) => {// normaaleihin logiviesteihin tarkoitetun funktion
    if (process.env.NODE_ENV !== 'test') {  // jos testit meneillään, ei tulosteta mitään
      console.log(...params)
    }
  }
  
  const error = (...params) => {// virheviesteihin tarkoitetun funktio
    if (process.env.NODE_ENV !== 'test') {  // jos testit meneillään, ei tulosteta mitään
      console.error(...params)
    }
  }
  
  
  module.exports = {
    info, error
  }