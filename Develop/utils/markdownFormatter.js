function formatLink(label, url) {
    return `[${label}](${url})`;
  }
  
  function formatCode(code, language = '') {
    return `\`\`\`${language}\n${code}\n\`\`\``;
  }
  
  function formatList(items) {
    return items.map(item => `- ${item}`).join('\n');
  }
  
  // Function to create Markdown headers
function formatHeader(text, level = 1) {
    return `${'#'.repeat(level)} ${text}\n`;
  }
  
  // Function to format bold text in Markdown
  function formatBold(text) {
    return `**${text}**`;
  }
  function generateBadge(type, data) {
    const badges = {
      license: `![License](https://img.shields.io/badge/license-${encodeURIComponent(data.replace(/\s+/g, '_'))}-blue.svg)`,
      build: `![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)`,
    };
    return badges[type] || '';
  }
  
  // Export all functions to be used in other parts of the application
  module.exports = {
    formatLink,
    formatCode,
    formatList,
    formatHeader,
    formatBold,
    generateBadge,
  };