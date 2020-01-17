//Questions to be asked are stored using an array
const questions = ["What is your GitHub username?","What is your favourite color [pink, red, green, blue]"
  
];
// declaration of the required package variables
//const genPDF = require("wkhtmltopdf");
const genHTML = require("./generateHTML");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const axios = require("axios");
const pdf = require("html-pdf");
const config = { headers: { accept: "application/json" } };
//const htmlTo = require('htmlto');




//prompt user to get the details of GitHub user name and favourite color
function promptUser() {
  return inquirer.prompt([{
    type: "input",
    name: "name",
    message: questions[0]
  },
  {
    type: "input",
    name: "color",
    message: questions[1]
  }]);
}
async function init() {
  try {
    const answers = await promptUser();
    
    console.log(answers);
    const userName=answers.name;
    const userInfo = "https://api.github.com/users/"+userName;
    console.log(userInfo);
    //User information fetched from GitHub using get method
    axios
    .get(userInfo, config)
    .then(function(res) {
      //passing the response to the HTML file to write the file with required details
      const html = genHTML.generateHTML(answers,res);      
      writeFileAsync("index.html", html);
      console.log("Successfully written to index.html"); 
      var options = { format: 'Letter' }; 
      pdf.create(html, options).toFile('./portfolio.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); 
      });      
    })
    .catch(function(err) {
      console.log(err);
    });
   
  } catch(err) {
    console.log(err);
  }
}

init();