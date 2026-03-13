
const { google } = require('googleapis');
const path = require('path');

let authConfig = {
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  keyFile: path.join(__dirname, 'non-existent-file.json')
};

const auth = new google.auth.GoogleAuth(authConfig);

async function test() {
  console.log('starting');
  try {
    const authClient = await auth.getClient();
    console.log('got client');
  } catch (e) {
    console.error('error caught:', e.message);
  }
  console.log('done');
}

test();
