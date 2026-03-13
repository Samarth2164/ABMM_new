const express = require('express');
const router = express.Router();

const events = [
  {
    day: '19', month: 'FEB 2026',
    title: 'Shivaji Jayanti Utsav',
    description: 'Grand celebration of Chhatrapati Shivaji Maharaj\'s birth anniversary with procession, cultural programs, and community feast.',
    location: 'Community Hall, Main Ground',
    time: '9:00 AM onwards',
    badge: 'Celebration'
  },
  {
    day: '25', month: 'MAR 2026',
    title: 'Amba Bhavani Puja',
    description: 'Annual goddess puja with bhajans, prasad distribution, and community gathering in the spirit of devotion and unity.',
    location: 'Mandali Temple Premises',
    time: '6:00 AM – 8:00 PM',
    badge: 'Religious'
  },
  {
    day: '10', month: 'APR 2026',
    title: 'Maratha Krida Mahotsav',
    description: 'Annual sports festival for youth — kabaddi, wrestling, and athletics, celebrating the warrior spirit of the Maratha tradition.',
    location: 'Sports Ground, Near Mandali',
    time: '7:00 AM – 6:00 PM',
    badge: 'Cultural'
  }
];

const updates = [
  { color: '#7c3aed', title: 'New Welfare Fund launched for members', description: 'The Mandali has launched a new welfare fund to support members during medical emergencies. Apply through the committee secretary.', time: '2 days ago' },
  { color: '#f5c842', title: 'Registration open for Shivaji Jayanti procession', description: 'All members and volunteers are invited to register for the grand procession on February 19th. Contact the office by Feb 10.', time: '5 days ago' },
  { color: '#10b981', title: 'Blood donation camp — thank you!', description: 'Our recent blood donation camp saw 85 donors. A heartfelt thanks to all volunteers and members who participated.', time: '2 weeks ago' },
  { color: '#ef4444', title: 'Annual general meeting — March 5', description: 'All members are requested to attend the AGM on March 5, 2026 at 5:00 PM. Agenda includes budget review and committee elections.', time: '3 weeks ago' }
];

const committee = [
  { initials: 'hr', name: 'Hemaraja Rao', role: 'President', bg: '#ede9fe', color: '#5b21b6', image: '/images/committee/president.jpeg' },
  { initials: 'PM', name: 'Kavita Bekal', role: 'Events', bg: '#fef3c7', color: '#92400e', image: '/images/committee/events.jpg' },
  { initials: 'SK', name: 'Abhilash Sindhya', role: 'Secretary', bg: '#d1fae5', color: '#065f46', image: '/images/committee/secretary.jpg' }
];

const gallery = [
  { link: 'https://photos.app.goo.gl/Z6ssoUpGpaKAy5za8', coverUrl: '/images/committee/cover.JPG', label: 'Sporty dayout 2026', bg: '#ea580c' },
  { link: 'https://photos.app.goo.gl/Texa3VHuCx1PekFF9', coverUrl: '/images/committee/cover2.JPG', label: 'Satyanarayana kathe 2025', bg: '#f97316' }
];

router.get('/', (req, res) => {
  res.render('index', { events, updates, page: 'home' });
});

router.get('/gallery', (req, res) => {
  res.render('gallery', { gallery, page: 'gallery' });
});

router.get('/committee', (req, res) => {
  res.render('committee', { committee, page: 'committee' });
});

router.get('/join', (req, res) => {
  res.render('join', { page: 'join', success: false, name: '' });
});

const { google } = require('googleapis');
const path = require('path');
const nodemailer = require('nodemailer');

let authConfig = {
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
};

if (process.env.GOOGLE_CREDENTIALS) {
  authConfig.credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
} else {
  authConfig.keyFile = path.join(__dirname, '../google-credentials.json');
}

const auth = new google.auth.GoogleAuth(authConfig);

async function appendToSheet(data) {
  try {
    const authClient = await auth.getClient();
    const gsapi = google.sheets({ version: 'v4', auth: authClient });
    const opt = {
      spreadsheetId: '1qjSyABncWTVC_2QY4JW7IV05d_OfnACKjHvka7lQLpY',
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [data] }
    };
    await gsapi.spreadsheets.values.append(opt);
    console.log("Appended to Google Sheet successfully");
    return true;
  } catch (e) {
    console.error('Google Sheets Error:', e);
    return false;
  }
}

async function sendEmail(name, email) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("Email credentials not set in .env! Skipping email.");
    return;
  }
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Amba Bhavani Marata Mandali Volunteering!',
    text: `Namaskara ${name},\n\nThank you for registering to volunteer for Amba Bhavani Marata Mandali events! We have received your submission and will contact you when volunteer opportunities arise.\n\nJai Bhavani! Jai Shivaji!\n- ABMM Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (e) {
    console.error("Email sending error:", e);
  }
}

router.post('/join', async (req, res) => {
  const { name, phone, email, message } = req.body;
  const timestamp = new Date().toLocaleString();

  console.log(`New volunteer: ${name} | ${phone} | ${email}`);

  // Save to Google Sheet in the background (prevent UI hang)
  appendToSheet([timestamp, name, phone, email, message || '']).catch(err => console.error(err));

  // Send Automated Email in the background
  sendEmail(name, email).catch(err => console.error(err));

  res.render('join', { page: 'join', success: true, name });
});

module.exports = router;
