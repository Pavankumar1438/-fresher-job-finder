// AIML Fresher Jobs - single-file site + API + backend. No npm install needed.
// Run: node server.js   ->  http://localhost:3000
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.SITE_URL || 'https://aimlprojectstarter.live';
const DB = path.join(__dirname, 'data.json');

// SAMPLE DATA - not real openings. Replace with real jobs later.
const JOBS = [
  { id: 1, title: 'Junior AI/ML Engineer (Sample)', company: 'Sample Tech Pvt Ltd', location: 'Bengaluru', type: 'Job', batch: '2025/2026', skills: ['Python', 'ML basics', 'NumPy'], desc: 'Sample listing for demo. Build and test simple ML models with a senior team.' },
  { id: 2, title: 'Data Analyst Trainee (Sample)', company: 'Example Analytics', location: 'Hyderabad', type: 'Job', batch: '2025/2026', skills: ['SQL', 'Excel', 'Power BI'], desc: 'Sample listing for demo. Clean data and build dashboards.' },
  { id: 3, title: 'Software Developer Fresher (Sample)', company: 'Demo Softwares', location: 'Chennai', type: 'Job', batch: '2026', skills: ['Java', 'DSA', 'Git'], desc: 'Sample listing for demo. Full-time role for 2026 CSE graduates.' },
  { id: 4, title: 'Python Developer Intern (Sample)', company: 'Sample Labs', location: 'Remote', type: 'Internship', batch: '2026/2027', skills: ['Python', 'Flask', 'APIs'], desc: 'Sample listing for demo. 3-month remote internship.' },
  { id: 5, title: 'Off-Campus Drive 2026 (Sample)', company: 'Sample Corp', location: 'Pan India', type: 'Off-Campus', batch: '2026', skills: ['Aptitude', 'Coding round'], desc: 'Sample listing for demo. Online test followed by interviews.' },
  { id: 6, title: 'Walk-in Drive Graduate Trainee (Sample)', company: 'Example Services', location: 'Pune', type: 'Off-Campus', batch: '2024-2026', skills: ['Communication', 'Basic coding'], desc: 'Sample listing for demo. Walk-in with resume and ID.' }
];

function readDb() { try { return JSON.parse(fs.readFileSync(DB, 'utf8')); } catch { return { subscribers: [], messages: [] }; } }
function writeDb(d) { fs.writeFileSync(DB, JSON.stringify(d, null, 2)); }

const PAGE = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AIML Fresher Jobs - AI/ML &amp; CSE Fresher Jobs in India 2026</title>
<meta name="description" content="Fresher jobs, internships and off-campus drives for AI/ML and CSE students in India, plus resume and interview guides.">
<meta name="keywords" content="fresher jobs in India, AI ML fresher jobs, off campus drives 2026, software jobs for freshers">
<link rel="canonical" href="${DOMAIN}/">
<meta property="og:title" content="AIML Fresher Jobs"><meta property="og:description" content="AI/ML and CSE fresher jobs in India."><meta property="og:type" content="website"><meta property="og:url" content="${DOMAIN}/">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"AIML Fresher Jobs","url":"${DOMAIN}/"}</script>
<style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui,Arial,sans-serif;color:#1f2937;background:#f5f7fb}
a{color:#2563eb}header{background:#1e3a8a;color:#fff;padding:14px 20px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;align-items:center}
header b{font-size:20px}nav a{color:#fff;margin-left:16px;text-decoration:none}
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
<header><b>AIML Fresher Jobs</b><nav><a href="#jobs">Jobs</a><a href="#guides">Guides</a><a href="#subscribe">Alerts</a><a href="#contact">Contact</a></nav></header>
<div class="hero"><h1>AI/ML &amp; CSE Fresher Jobs in India</h1><p>Jobs, internships, off-campus drives and career guides for freshers.</p>
<input id="q" type="search" placeholder="Search Python, SQL, Bengaluru..." aria-label="Search jobs">
<select id="type" aria-label="Job type"><option value="">All</option><option>Job</option><option>Internship</option><option>Off-Campus</option></select></div>
<main>
<section id="jobs"><h2>Latest Fresher Jobs</h2><p class="note">Sample data for project demo. Not real openings.</p><div id="list" class="grid" aria-live="polite"></div></section>
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
list.innerHTML=d.jobs.length?d.jobs.map(j=>'<article class="card"><h3>'+esc(j.title)+'</h3><div>'+esc(j.company)+' - '+esc(j.location)+'</div><div><span class="tag">'+esc(j.type)+'</span><span class="tag">Batch '+esc(j.batch)+'</span>'+j.skills.map(s=>'<span class="tag">'+esc(s)+'</span>').join('')+'</div><p>'+esc(j.desc)+'</p></article>').join(''):'<p>No jobs found.</p>'}
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
    return json(res, 200, { count: jobs.length, sample_data: true, jobs });
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
