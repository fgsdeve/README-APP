
//index.js: Main script for generating a professional README.md based on user input.
const inquirer = require('inquirer'); //global files
const fs = require('fs');
const md = require('./utils/markdownFormatter');

// Define questions for collecting information to populate the README file.
//see like this = type(string), input (the data we will use in table content) and so on..
const questions = [
  { type: 'input', name: 'projectTitle', message: 'What is the title of your project?' },
  { type: 'input', name: 'description', message: 'Describe your project:' },
  { type: 'input', name: 'installation', message: 'Installation instructions:' },
  { type: 'input', name: 'usage', message: 'Usage information:' },
  { type: 'input', name: 'contribution', message: 'Contribution guidelines:' },
  { type: 'input', name: 'tests', message: 'Test instructions:' },
  { type: 'list', name: 'license', message: 'Choose a license for your project:', choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'] },
  { type: 'input', name: 'github', message: 'Enter your GitHub username:' },
  { type: 'input', name: 'email', message: 'Enter your email address:' },
  { type: 'input', name: 'gettingStarted', message: 'Provide a quick start guide to your project:'},
  { type: 'input', name: 'faq', message: 'Provide any frequently asked questions and their answers:'},
];

  // Prompt the user with questions and handle the response.
inquirer.prompt(questions).then(answers => {
  const readmeContent = generateReadme(answers);
  writeToFile('README.md', readmeContent);
}).catch(error => {
  console.error('An error occurred during the inquirer prompt:', error);
});

// Function to generate a dynamic table of contents based on provided answers.
function generateTableOfContents(answers) {
  const sections = [
    answers.installation && '[Installation](#installation)',
    answers.usage && '[Usage](#usage)',
    answers.contribution && '[Contribution](#contribution)',
    answers.tests && '[Tests](#tests)', // Fixed capitalization
    answers.gettingStarted && '[Getting Started](#getting-started)',
    answers.faq && '[FAQ](#faq)',
    '[Questions](#questions)',
    '[License](#license)'
  ].filter(Boolean).join('\n - ');

  return `${md.formatHeader('Table of Contents', 2)}
  - ${sections}`;
}

// Function to generate badges based on user selections.
function generateBadges(answers) {
  let badgeText = '';
  if (answers.badges && answers.badges.includes('build')) {
    badgeText += md.generateBadge('build', 'passing') + '\n';
  }
  if (answers.badges && answers.badges.includes('license')) {
    badgeText += md.generateBadge('license', answers.license) + '\n';
  }
  return badgeText;
}

//generating readme functions 
function generateReadme(answers) {
  const toc = generateTableOfContents(answers);
  const badges = generateBadges(answers);

  return `${badges}
${md.formatHeader(answers.projectTitle, 1)}
${md.formatHeader('Description', 2)}
${answers.description}

${toc}

${md.formatHeader('Installation', 2)}
${answers.installation}

${md.formatHeader('Usage', 2)}
${answers.usage}

${md.formatHeader('Contribution', 2)}
${answers.contribution}

${md.formatHeader('Tests', 2)}
${answers.tests}

${md.formatHeader('Questions', 2)}
For questions, please contact ${md.formatLink(answers.email, `mailto:${answers.email}`)}.

${md.formatHeader('License', 2)}
${answers.license} license.
`;
}

// Function to write the generated README content to a file.

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('README has been generated!');
  });
}

