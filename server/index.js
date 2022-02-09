// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { normalize } = require("path");
const pretty = require("pretty");

// URL of the page we want to scrape
const url = "https://www.mohfw.gov.in/";

// Async function which scrapes the data
 async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data,{xmlMode: true});



let blue = $('.field.field-name-field-covid-statewise-data.field-type-field-collection.field-label-above');
let active_cases = $('.bg-blue>strong>table>tbody>tr>td').text().trim()

let discharged = $('.bg-green>strong').text().trim()


let deaths =  $('.bg-red>strong').text().trim()


const vaccination = $('.fullbol').text().trim()
const tests = $('.tested').text().trim()
const table = blue.text().trim()

// console.log(blue.trim()); 


let res = [active_cases,deaths,discharged,tests,vaccination]

let element = '#state-data > div > div > div > div > table > tbody > tr:nth-child(5)'

console.log($(element).html())

$(element).each((index, el) => {
    console.log(index)
}
)

obj = {}
obj['active_cases'] = active_cases
obj['deaths'] = deaths
obj['discharged'] = discharged
obj['vaccination'] = vaccination
obj['tests'] = tests
obj['table'] = table


// console.log (JSON.stringify(obj,null,' '))
// console.log(active_cases)
// console.log(deaths); 
// console.log(discharged); 
// console.log(vaccination); 
// console.log(tests);

// active_cases = $('.mob-hide').map((i,section) => {
//     let act = $(section).find('strong');
//     return act.text().trim()
// }).get(0)

console.log(blue.text())




  
  } catch (err) {
    console.error(err);
  }
}



function debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }


// Invoke the above function
scrapeData();