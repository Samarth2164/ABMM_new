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
  { initials: 'RS', name: 'Rajendra Shinde', role: 'President', bg: '#ede9fe', color: '#5b21b6' },
  { initials: 'PM', name: 'Priya More', role: 'Vice President', bg: '#fef3c7', color: '#92400e' },
  { initials: 'SK', name: 'Suresh Kamble', role: 'Secretary', bg: '#d1fae5', color: '#065f46' },
  { initials: 'AP', name: 'Anita Patil', role: 'Treasurer', bg: '#fee2e2', color: '#991b1b' },
  { initials: 'VB', name: 'Vijay Bhosale', role: 'Cultural Head', bg: '#e0f2fe', color: '#075985' },
  { initials: 'NJ', name: 'Nilesh Jadhav', role: 'Youth Wing Head', bg: '#fce7f3', color: '#9d174d' }
];

const gallery = [
  { link: 'https://photos.google.com/', coverUrl: 'https://images.unsplash.com/photo-1604928148902-60195d24d081?q=80&w=600&auto=format&fit=crop', emoji: '🎊', label: 'Shivaji Jayanti 2025', bg: '#2d1054' },
  { link: '', coverUrl: '', emoji: '🙏', label: 'Amba Puja 2025', bg: '#3d1a6e' },
  { link: '', coverUrl: '', emoji: '🏆', label: 'Krida Mahotsav', bg: '#1a0a2e' },
  { link: '', coverUrl: '', emoji: '🩸', label: 'Blood Donation Camp', bg: '#4a2080' },
  { link: '', coverUrl: '', emoji: '🎶', label: 'Bhajan Sandhya', bg: '#2d1054' },
  { link: '', coverUrl: '', emoji: '🌺', label: 'Community Gatherings', bg: '#1a0a2e' },
  { link: '', coverUrl: '', emoji: '🎭', label: 'Cultural Program', bg: '#3d1a6e' },
  { link: '', coverUrl: '', emoji: '🤝', label: 'Welfare Drive', bg: '#2d1054' },
  { link: '', coverUrl: '', emoji: '🥁', label: 'Dhol-Tasha Festival', bg: '#4a2080' }
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

router.post('/join', (req, res) => {
  const { name, phone, email } = req.body;
  console.log(`New member: ${name} | ${phone} | ${email}`);
  res.render('join', { page: 'join', success: true, name });
});

module.exports = router;
