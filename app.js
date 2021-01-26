
//gets the whole data from the city
const getVaccineData = async () => {
  let response = await axios.get('https://data.cityofchicago.org/resource/553k-3xzc.json');
  if (response.status == 200) {
    // test for status 
    console.log(response.status)
  }
  return response.data
}


//pulls data from each record for latest date and returns array
const updateData = (data) => {

  //iterates through the array to pull latest date
  const findCurrentDate = (array) => {

    console.log(array);
    let latestDate = new Date("2015-03-25");
    array.forEach(element => {
      let date = new Date(element.date)
      if (date > latestDate) {
        // console.log(element.date);
        latestDate = date;
      }
    })

    //updates latest date indicator
    const upDate = document.querySelector('#upDate');
    const dateData = document.createTextNode(`Last data released: ${latestDate}`);
    upDate.append(dateData);

    console.log(latestDate);
    return (latestDate);
  }

  //creates an array of chosen indicators for the latest date
  latestDate = findCurrentDate(data);
  latestData = [];
  data.forEach(element => {
    let date = new Date(element.date);
    // console.log(date);
    if (date.getTime() === latestDate.getTime()) {
      console.log("latest date found");
      const objToAdd = {
        zip: element.zip_code,
        percentVaxd: element.vaccine_series_completed_percent_population,
        pop: element.population,
        percentFirstDosed: element._1st_dose_percent_population,
        dosesYesterday: element.total_doses_daily,
        dosesTotal: element.total_doses_cumulative,
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
  latestData.forEach(element => {
    // console.log(element.pop);
    totalChiPop += Number(element.pop);
    // console.log(`total chi pop ${totalChiPop}`);
    totalPopVaxd += (element.pop * element.percentVaxd);
    // console.log(`totalPopVaxd ${totalPopVaxd}`);
  });
  const totalVaxd = totalPopVaxd / totalChiPop;
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





