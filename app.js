
//gets the whole data from the city
const getVaccineData = async () => {
  let response = await axios.get('https://data.cityofchicago.org/resource/553k-3xzc.json')

  // ? $select = zip_code, vaccine_series_completed_percent_population, population, _1st_dose_percent_population, total_doses_daily, total_doses_cumulative, date, vaccine_series_completed_cumulative');
  // let response = await axios.get('https://data.cityofchicago.org/resource/553k-3xzc.json?$select=distinct(zip_code)')
  // console.log(response2.data);
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
    // let latestDate = new Date("2015-03-25");
    counter = 0;
    array.forEach(element => {
      counter++;
      if (!datesByZip.hasOwnProperty(element.zip_code)) {
        // console.log(`created ${element.zip_code}`);
        datesByZip[element.zip_code] = element.date;
      } else {
        let date = new Date(element.date)
        if (date > datesByZip[element.zip_code]) {
          // console.log(element.date);
          datesByZip[element.zip_code] = date;
        };
      };
    });
    // console.log(counter);
    console.log(datesByZip);
    // console.log(Object.keys(datesByZip).length)

    //updates latest date indicator
    const upDate = document.querySelector('#upDate');
    const dateData = document.createTextNode(`Last data released: ${datesByZip[60601]}`);
    upDate.append(dateData);

    // console.log(latestDate);
    return (datesByZip);
  }

  //creates an array of chosen indicators for the latest date
  datesByZip = findCurrentDate(data);
  latestData = [];
  data.forEach(element => {
    let date = new Date(element.date);
    let zipDate = new Date(datesByZip[element.zip_code]);
    // console.log(date);
    if (date.getTime() === zipDate.getTime()) {
      console.log("latest date found");
      const objToAdd = {
        zip: element.zip_code,
        percentVaxd: element.vaccine_series_completed_percent_population,
        pop: element.population,
        percentFirstDosed: element._1st_dose_percent_population,
        dosesYesterday: element.total_doses_daily,
        peopleVaxd: element.vaccine_series_completed_cumulative,
      };
      latestData.push(objToAdd);
    };
  });

  console.log(latestData);
  return latestData;
}

//appends from array of selected indicators to DOM main & flexxy table 
const generateTable = (latestData) => {

  //adds all zip codes' populations and vaccine series completed
  //then puts a big 'ol number for total percent vaxd
  let totalChiPop = 0;
  let totalPopVaxd = 0;
  let totalPeopleVaxd = 0;
  latestData.forEach(element => {
    // console.log(element.pop);
    totalChiPop += Number(element.pop);
    totalPopVaxd += (element.pop * element.percentVaxd);
    totalPeopleVaxd += Number(element.peopleVaxd);
  });
  console.log(`total chi pop ${totalChiPop}`);
  console.log(`city's % says: ${totalPopVaxd}`);
  console.log(`calculated #: ${totalPeopleVaxd}`);
  const totalVaxd = totalPeopleVaxd / totalChiPop;
  // console.log(totalVaxd);
  const bigNumber = document.createTextNode(`${Math.round(totalVaxd * 1000) / 10}%`);
  const fuckCovid = document.querySelector(".fuck-covid");
  fuckCovid.append(bigNumber);


  const table = document.querySelector('.table');
  latestData.forEach(element => {
    const row = document.createElement('div');
    row.classList.add('table-row', 'observation');
    for (key in element) {
      // console.log(element[key]);
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
  .then(response => generateTable(updateData(response)))


//search function eliminates non-matching zips on keyup
function searchPlease() {
  let input = document.querySelector('#searchbar').value;
  let rows = document.querySelectorAll('.observation')
  // console.log(rows);
  rows.forEach(element => {
    console.log(element.firstChild.innerText);
    if (!element.firstChild.innerText.includes(input)) {
      console.log("bang");
      element.style.display = 'none';
    } else {
      element.style.display = 'flex';
    }

  });
}
const searchButton = document.querySelector('#searchbar');
searchButton.addEventListener('keyup', searchPlease)


  //searchbar functionality get





