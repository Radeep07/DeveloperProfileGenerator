//Questions to be asked are stored using an array
const questions = ["What is your GitHub username?","What is your favourite color [pink, red, green, blue]"
  
];
// declarattion of the required package variables
//const genPDF = require("wkhtmltopdf");
const genHTML = require("./generateHTML.js");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
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



function writeToFile(fileName, data) {
  //writeFileAsync(fileName, data);
}

async function init() {
  try {
    const answers = await promptUser();
    
    console.log(answers);
    const html = await genHTML.generateHTML(answers);

    await writeFileAsync("index.html", html);

    console.log("Successfully written to index.html");
    
  } catch(err) {
    console.log(err);
  }
}

init();
