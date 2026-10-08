// AIML Fresher Jobs - single-file site + API + backend. No npm install needed.
// Run: node server.js   ->  http://localhost:3000
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.SITE_URL || 'https://aimlprojectstarter.live';
const DB = path.join(__dirname, 'data.json');

// Real openings checked on 8 Oct 2026. Every listing below was opened and verified on its official page.
const JOBS = [
  { id: 1, title: 'Software Dev Engineer I (University Grad)', company: 'Amazon', location: 'Hyderabad / Bangalore / Chennai / Delhi / Pune', type: 'Job', batch: '2025/2026', skills: ['Python', 'Java', 'DSA'], desc: 'Full-time SDE I role for new graduates through Amazon University Talent Acquisition. Applications reviewed on a rolling basis.', apply: 'https://www.amazon.jobs/en/jobs/3105696/software-dev-engineer-i-amazon-university-talent-acquisition' },
  { id: 2, title: 'SDE I Intern', company: 'Amazon', location: 'Pan India', type: 'Internship', batch: '2026', skills: ['Python', 'Java', 'DSA'], desc: 'Software development internship for 2026 graduates only. All Amazon India offices. Full-time commitment during the internship.', apply: 'https://www.amazon.jobs/en/jobs/3046606/sde-i-intern-amazon-university-talent-acquisition' },
  { id: 3, title: 'AI / Machine Learning Engineer', company: 'Siemens Energy', location: 'Gurugram', type: 'Job', batch: '2024/2025/2026', skills: ['Python', 'PyTorch', 'LLMs', 'RAG'], desc: 'Fresher AI/ML role in the Digital Products and Solutions team. Python, ML pipelines, GenAI and RAG work.', apply: 'https://jobs.siemens-energy.com/en_US/jobs/FolderDetail/298438' },
  { id: 4, title: 'Junior AI Engineer', company: 'Trackmind', location: 'Hyderabad', type: 'Job', batch: '2024-2026', skills: ['Python', 'GenAI', 'LLMs'], desc: 'Work from office, 0-2 years. Build AI/ML and GenAI applications with Python, NumPy, Pandas and scikit-learn.', apply: 'https://jobs.lever.co/trackmind/ad66c0ec-1ae9-47cb-9d5d-83ae1cb6d200' },
  { id: 5, title: 'AI/ML Trainee - Generative AI', company: 'WINIT', location: 'Hyderabad', type: 'Job', batch: '2024-2026', skills: ['Python', 'LangChain', 'RAG', 'AWS'], desc: 'CTC 2-3 LPA. Build GenAI automation with LangChain, LLMs and RAG on AWS. No experience needed. Apply by 25 Jan 2027.', apply: 'https://internshala.com/job/detail/fresher-ai-ml-trainee--generative-ai-job-in-hyderabad-at-winit1785457814' },
  { id: 6, title: 'GenAI Developer', company: 'RecruitBots AI', location: 'Remote', type: 'Job', batch: '2024-2026', skills: ['Python', 'LLMs', 'GenAI'], desc: 'Work from home, CTC 3-8 LPA, 0-2 years. Build generative AI and LLM applications. Apply by 28 Oct 2026.', apply: 'https://internshala.com/job/detail/fresher-remote-genai-developer-job-at-recruitbots-ai1790605980' },
  { id: 7, title: 'AI Engineer', company: 'Krutrim Insights', location: 'Delhi', type: 'Job', batch: '2025/2026', skills: ['Python', 'AI', 'GenAI'], desc: 'CTC 3-5.4 LPA, no experience needed, BTech/MTech/MCA students preferred. Training then client AI projects. Apply by 21 Oct 2026.', apply: 'https://internshala.com/job/detail/fresher-ai-engineer-job-in-delhi-at-krutrim-insights1788166470' },
  { id: 8, title: 'Computer Vision Trainee', company: 'Miracle Eye Pvt Ltd', location: 'Remote', type: 'Job', batch: '2024-2026', skills: ['Python', 'OpenCV', 'Computer Vision'], desc: 'Work from home, CTC 2 LPA, 10 openings. Python, OpenCV and ML for image recognition. Apply by 16 Oct 2026.', apply: 'https://internshala.com/job/detail/fresher-remote-computer-vision-trainee-job-at-miracle-eye-pvt-ltd1789524457' },
  { id: 9, title: 'AI with ML Intern (Fresher Job)', company: 'SkillSecureX', location: 'Remote', type: 'Job', batch: '2026/2027', skills: ['Python', 'NumPy', 'scikit-learn'], desc: 'Work from home, CTC 2-3 LPA. AI/ML model building, data preprocessing and projects. Apply by 9 Nov 2026.', apply: 'https://internshala.com/job/detail/fresher-remote-artificial-intelligecne-with-ml-intern-job-at-skillsecurex1778805024' },
  { id: 10, title: 'AI/ML Engineer Trainee', company: 'Office Beacon ASPL', location: 'Vadodara (Hybrid)', type: 'Internship', batch: '2026/2027', skills: ['Python', 'APIs', 'NLP'], desc: '6-month internship, stipend 30-40k/month. Test AI outputs, prepare datasets, write Python scripts. Apply by 23 Oct 2026.', apply: 'https://internshala.com/internship/detail/ai-ml-engineer-trainee-fresher-internship-in-vadodara-at-office-beacon-aspl1790138662' }
];

function readDb() { try { return JSON.parse(fs.readFileSync(DB, 'utf8')); } catch { return { subscribers: [], messages: [] }; } }
function writeDb(d) { fs.writeFileSync(DB, JSON.stringify(d, null, 2)); }

const PAGE = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AIML Fresher Jobs - AI/ML &amp; CSE Fresher Jobs in India 2026</title>
<meta name="description" content="Fresher jobs, internships and off-campus drives for AI/ML and CSE students in India, plus resume and interview guides.">
<meta name="keywords" content="fresher jobs in India, AI ML fresher jobs, off campus drives 2026, software jobs for freshers">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2064%2064%22%3E%3Crect%20width=%2264%22%20height=%2264%22%20rx=%2214%22%20fill=%22%232563eb%22/%3E%3Cpath%20d=%22M14%2046%20L26%2020%20L38%2046%20M18.5%2037h15%22%20stroke=%22%23fff%22%20stroke-width=%225%22%20fill=%22none%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22/%3E%3Cpath%20d=%22M46%2046V20%22%20stroke=%22%23fff%22%20stroke-width=%225%22%20stroke-linecap=%22round%22/%3E%3Cpath%20d=%22M40%2027l6-8%206%208%22%20stroke=%22%23fbbf24%22%20stroke-width=%224%22%20fill=%22none%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22/%3E%3C/svg%3E">
<link rel="canonical" href="${DOMAIN}/">
<meta property="og:title" content="AIML Fresher Jobs"><meta property="og:description" content="AI/ML and CSE fresher jobs in India."><meta property="og:type" content="website"><meta property="og:url" content="${DOMAIN}/">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"AIML Fresher Jobs","url":"${DOMAIN}/"}</script>
<style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui,Arial,sans-serif;color:#1f2937;background:#f5f7fb}
a{color:#2563eb}header{background:#1e3a8a;color:#fff;padding:14px 20px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;align-items:center}
header b{font-size:20px;display:flex;align-items:center;gap:10px}nav a{color:#fff;margin-left:16px;text-decoration:none}
.hero{background:#2563eb;color:#fff;text-align:center;padding:48px 16px}.hero h1{margin:0 0 8px;font-size:32px}
.hero input,.hero select{padding:12px;border:0;border-radius:6px;font-size:16px}.hero input{width:min(420px,90%)}
main{max-width:1000px;margin:auto;padding:20px}section{margin:28px 0}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:14px}
.card{background:#fff;border-radius:10px;padding:16px;box-shadow:0 1px 4px #0002}.card h3{margin:0 0 4px;font-size:17px}
.tag{display:inline-block;background:#e0e7ff;color:#1e3a8a;border-radius:12px;padding:2px 9px;font-size:12px;margin:2px 2px 0 0}
.note{background:#fef9c3;border:1px solid #facc15;padding:8px 12px;border-radius:6px;font-size:14px}
form{display:grid;gap:10px;max-width:420px}form input,form textarea{padding:10px;border:1px solid #cbd5e1;border-radius:6px;font:inherit}
button{background:#1e3a8a;color:#fff;border:0;padding:10px 16px;border-radius:6px;cursor:pointer;font-size:15px}
footer{text-align:center;padding:20px;color:#64748b;font-size:14px}
</style></head><body>
<header><b><svg width="34" height="34" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#2563eb"/><path d="M14 46 L26 20 L38 46 M18.5 37h15" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M46 46V20" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M40 27l6-8 6 8" stroke="#fbbf24" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>AIML Fresher Jobs</b><nav><a href="#jobs">Jobs</a><a href="#guides">Guides</a><a href="#subscribe">Alerts</a><a href="#contact">Contact</a></nav></header>
<div class="hero"><h1>AI/ML &amp; CSE Fresher Jobs in India</h1><p>Jobs, internships, off-campus drives and career guides for freshers.</p>
<input id="q" type="search" placeholder="Search Python, SQL, Bengaluru..." aria-label="Search jobs">
<select id="type" aria-label="Job type"><option value="">All</option><option>Job</option><option>Internship</option><option>Off-Campus</option></select></div>
<main>
<section id="jobs"><h2>Latest Fresher Jobs</h2><p class="note">Real openings checked on 8 Oct 2026. Deadlines change fast, apply early.</p><div id="list" class="grid" aria-live="polite"></div></section>
<section id="guides"><h2>Resume &amp; Interview Guides</h2><div class="grid">
<article class="card"><h3>Fresher Resume Format for CSE</h3><p>One page, projects first, skills section, GitHub link.</p></article>
<article class="card"><h3>How to Get Your First AI/ML Job</h3><p>Build 2-3 projects, learn Python and SQL, apply off-campus.</p></article>
<article class="card"><h3>Top HR and Technical Questions</h3><p>Prepare DSA basics, project explanation and self-introduction.</p></article></div></section>
<section id="subscribe"><h2>Get Job Alerts</h2><form id="sub"><input type="email" name="email" placeholder="Your email" required><button>Subscribe</button><small id="subMsg"></small></form></section>
<section id="contact"><h2>Contact</h2><form id="con"><input name="name" placeholder="Name" required><input type="email" name="email" placeholder="Email" required><textarea name="message" rows="4" placeholder="Message" required></textarea><button>Send</button><small id="conMsg"></small></form></section>
</main>
<footer>&copy; 2026 AIML Fresher Jobs - college SEO mini project</footer>
<script>
const list=document.getElementById('list'),q=document.getElementById('q'),type=document.getElementById('type');
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
async function load(){const r=await fetch('/api/jobs?q='+encodeURIComponent(q.value)+'&type='+encodeURIComponent(type.value));const d=await r.json();
list.innerHTML=d.jobs.length?d.jobs.map(j=>'<article class="card"><h3>'+esc(j.title)+'</h3><div>'+esc(j.company)+' - '+esc(j.location)+'</div><div><span class="tag">'+esc(j.type)+'</span><span class="tag">Batch '+esc(j.batch)+'</span>'+j.skills.map(s=>'<span class="tag">'+esc(s)+'</span>').join('')+'</div><p>'+esc(j.desc)+'</p><p><a href="'+esc(j.apply)+'" target="_blank" rel="noopener">Apply</a></p></article>').join(''):'<p>No jobs found.</p>'}
q.addEventListener('input',load);type.addEventListener('change',load);load();
async function send(form,url,msg){form.addEventListener('submit',async e=>{e.preventDefault();const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});const d=await r.json();document.getElementById(msg).textContent=d.message||d.error;if(r.ok)form.reset()})}
send(document.getElementById('sub'),'/api/subscribe','subMsg');send(document.getElementById('con'),'/api/contact','conMsg');
</script></body></html>`;

function json(res, code, obj) { res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }); res.end(JSON.stringify(obj)); }
function body(req) { return new Promise(ok => { let b = ''; req.on('data', c => { b += c; if (b.length > 1e5) req.destroy(); }); req.on('end', () => { try { ok(JSON.parse(b || '{}')); } catch { ok({}); } }); }); }
const okEmail = e => typeof e === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length < 200;

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const p = u.pathname;
  if (req.method === 'OPTIONS') { res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' }); return res.end(); }
  if (p === '/' && req.method === 'GET') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(PAGE); }
  if (p === '/api/health') return json(res, 200, { status: 'ok', time: new Date().toISOString() });
  if (p === '/api/jobs' && req.method === 'GET') {
    const q = (u.searchParams.get('q') || '').toLowerCase(), t = u.searchParams.get('type') || '';
    const jobs = JOBS.filter(j => (!t || j.type === t) && (!q || (j.title + j.company + j.location + j.skills.join(' ')).toLowerCase().includes(q)));
    return json(res, 200, { count: jobs.length, sample_data: false, jobs });
  }
  const m = p.match(/^\/api\/jobs\/(\d+)$/);
  if (m && req.method === 'GET') { const j = JOBS.find(x => x.id == m[1]); return j ? json(res, 200, j) : json(res, 404, { error: 'Job not found' }); }
  if (p === '/api/subscribe' && req.method === 'POST') {
    const b = await body(req); if (!okEmail(b.email)) return json(res, 400, { error: 'Enter a valid email' });
    const d = readDb(); if (!d.subscribers.includes(b.email)) d.subscribers.push(b.email); writeDb(d);
    return json(res, 200, { message: 'Subscribed. Thank you!' });
  }
  if (p === '/api/contact' && req.method === 'POST') {
    const b = await body(req); if (!b.name || !okEmail(b.email) || !b.message) return json(res, 400, { error: 'Fill all fields' });
    const d = readDb(); d.messages.push({ name: String(b.name).slice(0, 100), email: b.email, message: String(b.message).slice(0, 2000), at: new Date().toISOString() }); writeDb(d);
    return json(res, 200, { message: 'Message sent. Thank you!' });
  }
  if (p === '/robots.txt') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('User-agent: *\nAllow: /\nSitemap: ' + DOMAIN + '/sitemap.xml\n'); }
  if (p === '/sitemap.xml') { res.writeHead(200, { 'Content-Type': 'application/xml' }); return res.end('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + DOMAIN + '/</loc></url></urlset>'); }
  json(res, 404, { error: 'Not found' });
}).listen(PORT, () => console.log('Running on http://localhost:' + PORT));
