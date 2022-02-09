// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const pretty = require("pretty");

// URL of the page we want to scrape
const url = "https://www.mohfw.gov.in/";

// Async function which scrapes the data
 async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);

   

let blue = $('.mob-show').text();
let active_cases = $('.bg-blue>strong').text().trim()

let discharged = $('.bg-green>strong').text().trim()


let deaths =  $('.bg-red>strong').text().trim()


const vaccination = $('.fullbol').text().trim()
const tests = $('.tested').text().trim()

// console.log(blue.trim()); 

let res = [active_cases,deaths,discharged,tests,vaccination]

return res
// console.log(active_cases)
// console.log(deaths); 
// console.log(discharged); 
// console.log(vaccination); 
// console.log(tests);

// active_cases = $('.mob-hide').map((i,section) => {
//     let act = $(section).find('strong');
//     return act.text().trim()
// }).get(0)

// console.log(active_cases)




  
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();