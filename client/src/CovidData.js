import React, { useEffect, useState } from "react";
import "./CovidData.css";

function CovidData() {
const [activeCases, setActiveCases] = useState("");
const [deaths, setDeaths] = useState("");
const [discharged, setDischarged] = useState("");
const [vaccination, setVaccinations] = useState("");
const [tests, setTests] = useState("");
const [table, setTable] = useState("");
const [userInput, setUserInput] = useState("");



const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const pretty = require("pretty");



// URL of the page we want to scrape
const url = "https://www.mohfw.gov.in/";

const debounceOnChange = React.useCallback(debounce(scrapeData, 1000), []);

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
  const delay = ms => new Promise(res => setTimeout(res, ms));

//   const cacheTime = 10000
//   const cache = {}
//   const cacheTimer =0

//   const getCacheTimer = time => {
//       const now = new Date().getTime()
//       if(cacheTimer < now + time){
//           cacheTimer = now+ time
//       }

//       return cacheTimer
//   }

//   const fetchWithCache = async ((time) => {
//       const now = new Date.getTime()
//       if(!cache || cache.cacheTimer < now){
//           cache = await scrapeData()
//           cache.cacheTimer = getCacheTimer(time)
//       }

//       return cache
//   })


async function scrapeData() {
    // await delay(5000);
    try {
      // Fetch HTML of the page we want to scrape
      const { data } = await axios.get(url);
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data);


  
     
  
  let blue = $('.mob-show').text();
  let table = $('.site-update > div > div > div > div > table ').text().trim();

  let active_cases = $('.bg-blue>strong').text().trim()

  
  let discharged = $('.bg-green>strong').text().trim()
  
  
  let deaths =  $('.bg-red>strong').text().trim()
  
  
  const vaccination = $('.fullbol').text().trim()
  const tests = $('.tested').text().trim()
  
  // console.log(blue.trim()); 
  
  let res = [active_cases,deaths,discharged,tests,vaccination]


  let obj = {}
obj['activeCases'] = active_cases
obj['deaths'] = deaths
obj['discharged'] = discharged
obj['vaccination'] = vaccination
obj['tests'] = tests
console.log("obj :"+ obj.table)

  setData(obj)
  
  return obj
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


useEffect(() => {
        scrapeData()
    const interval = setInterval(() => {
       scrapeData()
      }, 120000);
      return () => clearInterval(interval);
}, []);

const handleSearch = (e) => {
    setUserInput(e.target.value);
  };


const setData = ({
	activeCases,
	discharged,
	deaths,
	vaccination,
	tests,
    table
}) => {
	setActiveCases(activeCases);
	setDischarged(discharged);
	setDeaths(deaths);
	setVaccinations(vaccination);
	setTests(tests);
    setTable(table);

};

const handleSubmit = (props) => {
	props.preventDefault();
	fetch(`https://www.mohfw.gov.in/data/datanew.json`)
	.then((res) => res.json())
	.then((data) => {
        // const t = JSON.stringify(data)
        // console.log("json "+ data[15].hasOwnProperty('state_name'))
		// setTable(data[15].state_name);

        for(var x in data){
           
            if(data[x].state_name && data[x].state_name.split(",").indexOf(userInput.toString())!=-1) {
                let showData= userInput + ':- Active:'+data[x].active+ ' Deaths: '+ data[x].death+' Cured: '+ data[x].cured
            setTable(showData);
            }
           
          }
	});
};

let date = ()=> {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
   return today

}

return (
	<div className="covidData">
	<h1>COVID-19 CASES TRACKER</h1>
	<div className="covidData__input">
	
	
    <form onSubmit={handleSubmit}>
          <input onChange={handleSearch} placeholder="Enter State Name" />
          <br />
          <button type="submit">Search</button>
        </form>
	

	</div>


	<div className="covidData__country__info">
		<p>Country Name : INDIA </p>

        <p>Date : {date()}</p>

		<p>{activeCases}</p>

		<p>{deaths}</p>

		<p>{discharged}</p>

		<p>{vaccination}</p>

		<p>{tests}</p>

        <p>{table}</p>

	</div>
	</div>
);
}



export default CovidData;

