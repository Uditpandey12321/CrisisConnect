// Disaster Types Data
const disasterTypes = [
  {
    name: 'Earthquake',
    img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80',
    desc: 'Sudden shaking of the ground caused by movements along faults.',
    causes: [
      'Tectonic plate movements',
      'Volcanic activity',
      'Human activities (mining, reservoir-induced)'
    ],
    measures: [
      'Drop, Cover, and Hold On',
      'Stay away from windows and heavy objects',
      'Evacuate if instructed by authorities'
    ]
  },
  {
    name: 'Flood',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    desc: 'Overflow of water submerging land that is usually dry.',
    causes: [
      'Heavy rainfall',
      'River overflow',
      'Dam breakage',
      'Urban drainage issues'
    ],
    measures: [
      'Move to higher ground',
      'Avoid walking or driving through flood waters',
      'Listen to emergency broadcasts'
    ]
  },
  {
    name: 'Cyclone',
    img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80',
    desc: 'A system of winds rotating inwards to an area of low pressure.',
    causes: [
      'Warm ocean waters',
      'Atmospheric disturbances',
      'Low-pressure systems'
    ],
    measures: [
      'Secure loose objects outdoors',
      'Stay indoors and away from windows',
      'Evacuate if advised'
    ]
  },
  {
    name: 'Fire',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
    desc: 'Uncontrolled burning that destroys forests, grasslands, or property.',
    causes: [
      'Lightning strikes',
      'Human negligence',
      'Electrical faults',
      'Arson'
    ],
    measures: [
      'Install smoke alarms',
      'Have an evacuation plan',
      'Never leave fires unattended'
    ]
  },
  {
    name: 'Pandemic',
    img: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=400&q=80',
    desc: 'A global outbreak of infectious disease.',
    causes: [
      'Spread of infectious agents',
      'Global travel',
      'Lack of immunity'
    ],
    measures: [
      'Practice good hygiene',
      'Wear masks and maintain distance',
      'Follow public health guidelines'
    ]
  },
  {
    name: 'Landslide',
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    desc: 'Movement of rock, earth, or debris down a slope.',
    causes: [
      'Heavy rainfall',
      'Earthquakes',
      'Slope instability',
      'Deforestation'
    ],
    measures: [
      'Avoid construction on steep slopes',
      'Plant vegetation to stabilize soil',
      'Evacuate if warning signs appear'
    ]
  }
];

function renderDisasterCards() {
  const container = document.querySelector('.disaster-cards');
  container.innerHTML = disasterTypes.map((d, i) => `
    <div class="card" onclick="openDisasterModal(${i})">
      <img src="${d.img}" alt="${d.name}" style="width:100%;height:120px;object-fit:cover;border-radius:6px 6px 0 0;">
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
    </div>
  `).join('');
}

// Modal for Disaster Details
function openDisasterModal(idx) {
  const d = disasterTypes[idx];
  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <span class="close-btn" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>${d.name}</h2>
      <img src="${d.img}" alt="${d.name}" style="width:100%;max-width:350px;border-radius:8px;">
      <p>${d.desc}</p>
      <h4>Causes</h4>
      <ul>
        <li>${d.causes ? d.causes.join('</li><li>') : 'Information coming soon.'}</li>
      </ul>
      <h4>Safety Measures</h4>
      <ul>
        <li>${d.measures ? d.measures.join('</li><li>') : 'Information coming soon.'}</li>
      </ul>
    </div>
  `;
  document.body.appendChild(modal);
}

// Alerts (Dummy Data)
const alerts = [
  { level: 'High', text: 'Severe cyclone warning for coastal areas.' },
  { level: 'Moderate', text: 'Flood alert in river basin regions.' },
  { level: 'High', text: 'Earthquake tremors felt in northern region.' }
];
function renderAlerts() {
  const feed = document.getElementById('alerts-feed');
  feed.innerHTML = alerts.map(a => `<div class="alert ${a.level.toLowerCase()}">${a.text}</div>`).join('');
}

// Emergency Contacts (Dummy Data)
const contacts = [
  { type: 'Police', number: '100' },
  { type: 'Fire', number: '101' },
  { type: 'Ambulance', number: '102' },
  { type: 'Disaster Helpline', number: '108' }
];
function renderContacts() {
  const list = document.getElementById('contacts-list');
  list.innerHTML = contacts.map(c => `<div class="contact-item"><b>${c.type}:</b> <a href="tel:${c.number}">${c.number}</a></div>`).join('');
}

// Map (OpenStreetMap iframe)
function renderMap() {
  document.getElementById('map-container').innerHTML = `<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=77.2,28.5,77.3,28.7&amp;layer=mapnik" style="width:100%;height:300px;border:0;"></iframe>`;
}

// Disaster Reporting Form
function renderReportForm() {
  document.getElementById('report-form').innerHTML = `
    <input type="text" name="name" placeholder="Your Name" required><br>
    <input type="tel" name="contact" placeholder="Contact Number" required><br>
    <select name="type" required>
      <option value="">Select Disaster Type</option>
      ${disasterTypes.map(d => `<option value="${d.name}">${d.name}</option>`).join('')}
    </select><br>
    <input type="text" name="location" placeholder="Location" required><br>
    <textarea name="desc" placeholder="Description" required></textarea><br>
    <button type="submit">Report</button>
    <div id="report-msg"></div>
  `;
  document.getElementById('report-form').onsubmit = function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this));
    localStorage.setItem('report_'+Date.now(), JSON.stringify(data));
    document.getElementById('report-msg').textContent = 'Report submitted!';
    this.reset();
  };
}

// Resources
const resources = [
  { name: 'First Aid Guide', url: 'https://www.redcross.org/content/dam/redcross/atg/PDF_s/Preparedness___Disaster_Recovery/Disaster_Preparedness/First_Aid/FirstAid.pdf', icon: '📄' },
  { name: 'Family Emergency Plan', url: 'https://www.ready.gov/sites/default/files/2020-03/family-emergency-communication-plan.pdf', icon: '📄' },
  { name: 'Evacuation Procedures', url: 'https://www.osha.gov/sites/default/files/publications/osha3088.pdf', icon: '📄' }
];
function renderResources() {
  document.getElementById('resources-list').innerHTML = resources.map(r => `<div class="resource-item">${r.icon} <a href="${r.url}" target="_blank" download>${r.name}</a></div>`).join('');
}

// Quiz
const quizQuestions = [
  { q: 'What should you do during an earthquake?', options: ['Run outside', 'Take cover under sturdy furniture', 'Stand near windows'], answer: 1 },
  { q: 'Which number is for fire emergency in India?', options: ['100', '101', '102'], answer: 1 },
  { q: 'What is a cyclone?', options: ['A type of earthquake', 'A rotating storm system', 'A flood'], answer: 1 }
];
let quizIdx = 0, quizScore = 0;
function renderQuiz() {
  const c = document.getElementById('quiz-container');
  if (quizIdx >= quizQuestions.length) {
    c.innerHTML = `<div>Your score: ${quizScore}/${quizQuestions.length}</div><button onclick="restartQuiz()">Restart</button>`;
    return;
  }
  const q = quizQuestions[quizIdx];
  c.innerHTML = `<div><b>${q.q}</b></div>` + q.options.map((opt, i) => `<button onclick="answerQuiz(${i})">${opt}</button>`).join('<br>');
}
function answerQuiz(i) {
  if (i === quizQuestions[quizIdx].answer) quizScore++;
  quizIdx++;
  renderQuiz();
}
function restartQuiz() {
  quizIdx = 0; quizScore = 0; renderQuiz();
}

// Volunteer/Donation
function renderVolunteerForm() {
  document.getElementById('volunteer-form').innerHTML = `
    <input type="text" name="name" placeholder="Your Name" required><br>
    <input type="email" name="email" placeholder="Email" required><br>
    <button type="submit">Register as Volunteer</button>
    <div id="volunteer-msg"></div>
  `;
  document.getElementById('volunteer-form').onsubmit = function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this));
    localStorage.setItem('volunteer_'+Date.now(), JSON.stringify(data));
    document.getElementById('volunteer-msg').textContent = 'Thank you for registering!';
    this.reset();
  };
}
function renderDonationInfo() {
  document.getElementById('donation-info').innerHTML = `
    <p>Support relief efforts by donating to trusted NGOs:</p>
    <a href="https://www.redcross.org/donate/donation.html/" target="_blank"><button>Donate to Red Cross</button></a>
    <a href="https://www.savethechildren.net/donate" target="_blank"><button>Donate to Save the Children</button></a>
  `;
}

// Social Media Icons
function renderSocialMedia() {
  document.querySelector('footer .social-media').innerHTML = `
    <a href="https://twitter.com/" target="_blank">🐦</a>
    <a href="https://facebook.com/" target="_blank">📘</a>
    <a href="https://instagram.com/" target="_blank">📸</a>
  `;
}

// On Load
window.onload = function() {
  renderDisasterCards();
  renderAlerts();
  renderContacts();
  renderMap();
  renderReportForm();
  renderResources();
  renderQuiz();
  renderVolunteerForm();
  renderDonationInfo();
  renderSocialMedia();
};

// Modal Styles
const style = document.createElement('style');
style.innerHTML = `
.modal-bg { position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(30,41,59,0.7);display:flex;align-items:center;justify-content:center;z-index:1000; }
.modal { background:#fff;padding:2rem;border-radius:10px;max-width:400px;width:95%;position:relative; }
.close-btn { position:absolute;top:10px;right:18px;font-size:2rem;cursor:pointer;color:#1e293b; }
.alert { padding:0.7rem 1rem;margin:0.5rem 0;border-radius:6px;font-weight:500; }
.alert.high { background:#fee2e2;color:#b91c1c; }
.alert.moderate { background:#fef9c3;color:#b45309; }
.contact-item { margin:0.5rem 0; }
.resource-item { margin:0.5rem 0; }
`;
document.head.appendChild(style);