//api token: ab51fqgncwi136oat93o6ukep
//token secret: 5qbfefqlokm3wpcywgsq1mixl7w9ejccnf220vrkxigqa8604y


//gets the whole data from the city
const getVaccineData = async () => {
  let response = await axios.get('https://data.cityofchicago.org/resource/553k-3xzc.json')

  // ? $select = zip_code, vaccine_series_completed_percent_population, population, _1st_dose_percent_population, total_doses_daily, total_doses_cumulative, date, vaccine_series_completed_cumulative');
  // let response = await axios.get('https://data.cityofchicago.org/resource/553k-3xzc.json?$select=distinct(zip_code)')
  console.log(response.data);
  if (response.status == 200) {
    // test for status 
    console.log(response.status)
  }
  return response.data
}


//pulls data from each record for latest date and returns array
const updateData = (data) => {

  //iterates through the array return a object of zipcode:latest date pairs
  const findCurrentDate = (array) => {

    let datesByZip = {};
    array.forEach(element => {
      if (!datesByZip.hasOwnProperty(element.zip_code)) {
        datesByZip[element.zip_code] = element.date;
      } else {
        let date = new Date(element.date);
        if (date > datesByZip[element.zip_code]) {
          datesByZip[element.zip_code] = date;
        };
      };
    });

    //updates latest date indicator
    const upDate = document.querySelector('#up-date');
    lastUpdate = datesByZip[60601].slice(0, 10);
    const dateData = document.createTextNode(`Data last updated: ${lastUpdate}`);
    upDate.append(dateData);

    return (datesByZip);
  }

  //creates an array of chosen indicators for the latest date
  datesByZip = findCurrentDate(data);
  latestData = [];
  data.forEach(element => {
    let date = new Date(element.date);
    let zipDate = new Date(datesByZip[element.zip_code]);
    if (date.getTime() === zipDate.getTime()) {
      const objToAdd = {
        zip: element.zip_code,
        percentVaxd: `${Math.round(element.vaccine_series_completed_percent_population * 1000) / 10}%`,
        pop: element.population,
        percentFirstDosed: `${Math.round(element._1st_dose_percent_population * 1000) / 10}%`,
        dosesYesterday: element.total_doses_daily,
        peopleVaxd: element.vaccine_series_completed_cumulative,
        peopleFirstDosed: element._1st_dose_cumulative
      };
      latestData.push(objToAdd);
    };
  });

  return latestData;
}

//appends ot DOM from array of objects of selected indicators  
const generateTable = (latestData) => {
  //generates summary statistics
  let totalChiPop = 0;
  let totalPopVaxd = 0;
  let totalPeopleVaxd = 0;
  let totalDosesYesterday = 0;
  let totalFirstDosed = 0;
  latestData.forEach(element => {
    totalChiPop += Number(element.pop);
    totalPopVaxd += (element.pop * element.percentVaxd);
    totalPeopleVaxd += Number(element.peopleVaxd);
    totalDosesYesterday += Number(element.dosesYesterday);
    totalFirstDosed += (Number(element.peopleFirstDosed));
  });
  const totalVaxd = totalPeopleVaxd / totalChiPop;

  const summaryStats = {
    zip: "all",
    percentVaxd: `${Math.round(totalVaxd * 1000) / 10}%`,
    pop: totalChiPop,
    percentFirstDosed: `${Math.round((totalFirstDosed / totalChiPop) * 1000) / 10}%`,
    dosesYesterday: totalDosesYesterday,
    peopleVaxd: totalPeopleVaxd,
    peopleFirstDosed: totalFirstDosed
  };
  //append summary stats to pos 0 of array
  latestData.splice(0, 0, summaryStats);

  //make big %
  const bigNumber = document.createTextNode(`${Math.round(totalVaxd * 1000) / 10}%`);
  const fuckCovid = document.querySelector(".fuck-covid");
  fuckCovid.append(bigNumber);


  //function sourced from
  //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //make big ratio display
  const bigRatio = document.createTextNode(`${numberWithCommas(totalPeopleVaxd)} people out of ${numberWithCommas(totalChiPop)} total`);
  const ratioContainer = document.querySelector('.big-ratio');
  ratioContainer.append(bigRatio);

  //make table, brick by brick - row by row
  const table = document.querySelector('.table');
  latestData.forEach(element => {
    const row = document.createElement('div');
    row.classList.add('table-row', 'observation');
    for (key in element) {

      const cell = document.createElement('div');
      cell.classList.add('cell', key);
      const data = document.createTextNode(element[key]);
      cell.append(data);
      row.append(cell);
    }
    table.append(row);
  })
}

getVaccineData()
  .then(response => generateTable(updateData(response)));


//search function eliminates non-matching zips on keyup
const searchPlease = () => {
  let input = document.querySelector('#searchbar').value;
  let rows = document.querySelectorAll('.observation')
  rows.forEach(element => {
    if (!element.firstChild.innerText.includes(input)) {
      element.style.display = 'none';
    } else {
      element.style.display = 'flex';
    }

  });
}
const searchButton = document.querySelector('#searchbar');
searchButton.addEventListener('keyup', searchPlease);

//header cells WILL reorder divs
const reOrder = (e) => {

  e.target.classList[1]
}


const headerCells = document.querySelectorAll('.table-row.header .cell');
console.log(headerCells);
headerCells.forEach(cell => {
  cell.addEventListener('click', reOrder)

})


const expandRow = () => {
  if (window is small)
  do thing.
}


