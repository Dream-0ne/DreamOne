
// This file contains all the template code to fetch data from the flask app



// This method will return a json of the User occasions
async function getOccasions() {
  const url = 'http://localhost:5000/occasions'
  fetch(url)
  .then(response => response.json())  
  .then(json => {
      console.log(json);
  })
}
getOccasions();
// This method will return a json object with keys being filters and values being the requirements
async function getFilters() {
  const url = 'http://localhost:5000/filters'
  fetch(url)
  .then(response => response.json())  
  .then(json => {
      console.log(json);
  })
}
