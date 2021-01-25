# Project Overview

## Project Name

Chicago Vaccine Tracker

## Project Description

This project will pull data from the city of Chicago Open Data Project and create a dynamically updated, easy-to read, open source, and add-free tracker of the percentage of Chicago residents vaccinated against COVID-19 by zip code.

## API and Data Sample

https://dev.socrata.com/foundry/data.cityofchicago.org/553k-3xzc

 {
        "zip_code": "60601",
        "date": "2021-01-16T00:00:00.000",
        "total_doses_daily": "22",
        "total_doses_cumulative": "958",
        "_1st_dose_daily": "17",
        "_1st_dose_cumulative": "666",
        "_1st_dose_percent_population": "0.044",
        "vaccine_series_completed_daily": "5",
        "vaccine_series_completed_cumulative": "292",
        "vaccine_series_completed_percent_population": "0.019",
        "population": "15083",
        "zip_code_location": {
            "type": "Point",
            "coordinates": [
                -87.622844,
                41.886262
            ]
        },
        "row_id": "60601-20210116"
    },

## Wireframes

MVP:
https://whimsical.com/p1-mvp-S5ge3TBYdKJgxfkxuLFtD2

PostMVP:
https://whimsical.com/p1-post-mvp-7aNDTUuE368aKJESwo4XLh

### MVP/PostMVP

MVP will be a display of the percent of Chicago population vaccinated, updated on a daily basis, followed by a tabular listing of all zip codes and percentages.

PostMVP will add a map, expandable data on each zip code, and a search bar.

#### MVP 

- Retrieve current vaccine_series_completed_percent_population for each Chicago zip code from API
- Display current total percentage for Chicago on top of page
- Display percentage vaccinated underneath in a pleasing tabular flexy format
- Add laptop responsitivity

#### PostMVP  

- Add slippy map with zip code tiles and tints for percentage completed
- Expand zipcode data on click in table
- Implement search bar with expanded data for zip codes
- Add tablet and widescreen responsitivity

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Jan 25-26| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|Jan 26| Project Approval | Incomplete
|Jan 27| Core Application Structure (HTML, CSS, etc.) | Incomplete
|Jan 28| Initial Clickable Model  | Incomplete
|Jan 29| MVP | Incomplete
|Feb 1| Presentations/Project Submission | Incomplete

## Priority Matrix

https://whimsical.com/priority-matrix-RxcddBWJmjgZoD1J2bUjoq

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Add basic HTML/CSS Structure | H | 3hrs|  |  |
| Structure API call | H | 3hrs|  |  |
| Append API data to DOM | H | 6hrs|  |  |
| Update Styling/Implement Flexbox | H | 4hrs|  |  |
| Troubleshoot and Finishing Touches | H | 2hrs|  |  |
| Total | H | 18hrs|  |  |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
