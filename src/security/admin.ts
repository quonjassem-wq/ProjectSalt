// src/security/admin.ts

const ADMIN_PASSWORD = "SALT-OWNER-ADMINTESZYBAKA*#!@(#s9_33_Salt";
const WEBHOOK_URL = "https://discord.com/api/webhooks/1513578964642173100/noVBYGuM0HvgRzry7BJcic-te203H6ZpeI2UtOPl97CVjSygESs-ECTeDr8wAX9QVJET";
const STORED_IP_KEY = 'salt_last_logged_ip';
const KEYS_STORAGE = 'salt_admin_keys';
const LOGS_STORAGE = 'salt_ip_logs';

// ----- HWID generator -----
export function generateHardwareId(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 50;
  const ctx = canvas.getContext('2d')!;
  ctx.textBaseline = "top";
  ctx.font = "14px 'Arial'";
  ctx.fillStyle = "#f60";
  ctx.fillRect(0, 0, 100, 40);
  ctx.fillStyle = "#069";
  ctx.fillText("SaltHWID", 10, 20);
  const b64 = canvas.toDataURL().substring(22);
  const nav = navigator.userAgent + (navigator.language || '') + screen.width + screen.height + (navigator.hardwareConcurrency || '');
  const combined = b64 + nav;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash) + combined.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).substring(0, 14);
}

// ----- IP logger (only when IP changes) -----
async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function logVisitor(ip: string) {
  try {
    const geoRes = await fetchWithTimeout(`http://ip-api.com/json/${ip}?fields=66846719`);
    const geo = await geoRes.json();
    const hwid = generateHardwareId();
    const locationPreview = geo.city ? `${geo.city}, ${geo.country}` : (geo.country || 'Unknown');
    
    // Store in localStorage
    const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE) || '[]');
    logs.unshift({ ip, hwid, timestamp: Date.now(), locationPreview });
    if (logs.length > 200) logs.pop();
    localStorage.setItem(LOGS_STORAGE, JSON.stringify(logs));
    
    // Send to Discord webhook
    const embed = {
      title: "Visitor Log",
      description: `IP: \`${ip}\`\nHWID: \`${hwid}\``,
      color: 0x2b2d42,
      fields: [{ name: "Location", value: locationPreview, inline: true }],
      timestamp: new Date().toISOString()
    };
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    }).catch(() => {});
  } catch (e) { /* silent */ }
}

async function checkAndLogNewIP() {
  try {
    const ipRes = await fetchWithTimeout('https://api.ipify.org?format=json');
    const { ip } = await ipRes.json();
    const lastIP = localStorage.getItem(STORED_IP_KEY);
    if (!lastIP || lastIP !== ip) {
      await logVisitor(ip);
      localStorage.setItem(STORED_IP_KEY, ip);
    }
  } catch (e) {}
}

// ----- Anti‑inspect (F12, context menu, dimension detection) -----
let isModalActive = false;
let detectionCooldown = false;
const STORAGE_KEY = 'devtoolsAttemptLock';

function showPersistentPopup() {
  if (isModalActive) return;
  localStorage.setItem(STORAGE_KEY, 'true');
  const modal = document.getElementById('devtoolsModal');
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    isModalActive = true;
  }
}

function apologizeAndClear() {
  localStorage.removeItem(STORAGE_KEY);
  const modal = document.getElementById('devtoolsModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
  isModalActive = false;
  detectionCooldown = true;
  setTimeout(() => { detectionCooldown = false; }, 1500);
}

function triggerDevtoolsCaught() {
  if (isModalActive || detectionCooldown) return;
  showPersistentPopup();
}

function isDevToolsOpen() {
  const widthDiff = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;
  return (widthDiff > 150) || (heightDiff > 150);
}

function setupAntiInspect() {
  // Block shortcuts
  window.addEventListener('keydown', (e) => {
    const isF12 = (e.key === 'F12');
    const isCtrlShiftI = (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i'));
    const isCtrlShiftJ = (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j'));
    const isCtrlShiftC = (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c'));
    const isCtrlU = (e.ctrlKey && (e.key === 'U' || e.key === 'u'));
    if (isF12 || isCtrlShiftI || isCtrlShiftJ || isCtrlShiftC || isCtrlU) {
      e.preventDefault();
      triggerDevtoolsCaught();
    }
  });
  window.addEventListener('contextmenu', (e) => { e.preventDefault(); triggerDevtoolsCaught(); });
  
  // Periodic detection
  setInterval(() => {
    if (!isModalActive && !detectionCooldown && isDevToolsOpen()) {
      triggerDevtoolsCaught();
    }
  }, 2000);
  
  window.addEventListener('resize', () => {
    setTimeout(() => {
      if (!isModalActive && !detectionCooldown && isDevToolsOpen()) triggerDevtoolsCaught();
    }, 400);
  });
  
  // Restore persistent lock
  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    showPersistentPopup();
  }
  
  // Attach sorry button listener
  const sorryBtn = document.getElementById('sorryButton');
  if (sorryBtn) sorryBtn.addEventListener('click', apologizeAndClear);
}

// ----- Admin Panel UI (rendered inside the overlay) -----
function renderKeysList() {
  const container = document.getElementById('keysContainer');
  if (!container) return;
  const keys = JSON.parse(localStorage.getItem(KEYS_STORAGE) || '[]');
  if (keys.length === 0) {
    container.innerHTML = '<div style="color:#aaa; text-align:center;">No keys generated yet.</div>';
    return;
  }
  let html = '';
  keys.forEach((k: any, idx: number) => {
    const expiryStr = k.expiry ? new Date(k.expiry).toLocaleString() : 'Unlimited';
    const hwidStr = k.hwid || 'None';
    html += `<div class="key-card"><strong>🔑 ${k.key}</strong><button class="delete-key" data-index="${idx}">Delete</button><br><span>HWID: ${hwidStr}</span><br><span>Expires: ${expiryStr}</span><br><span>Notes: ${k.notes || '—'}</span></div>`;
  });
  container.innerHTML = html;
  document.querySelectorAll('.delete-key').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt((e.currentTarget as HTMLElement).dataset.index!);
      const keysArr = JSON.parse(localStorage.getItem(KEYS_STORAGE) || '[]');
      keysArr.splice(index, 1);
      localStorage.setItem(KEYS_STORAGE, JSON.stringify(keysArr));
      renderKeysList();
    });
  });
}

function renderLogsTable() {
  const tbody = document.getElementById('logsTableBody');
  if (!tbody) return;
  const logs = JSON.parse(localStorage.getItem(LOGS_STORAGE) || '[]');
  if (logs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">No IP logs yet.</td></tr>';
    return;
  }
  let html = '';
  logs.forEach((log: any) => {
    const date = new Date(log.timestamp).toLocaleString();
    html += `<tr>
      <td>${log.ip}</td>
      <td><code>${log.hwid || 'unknown'}</code></td>
      <td>${date}</td>
      <td>${log.locationPreview || 'N/A'}</td>
      <td><a href="https://iplocation.com/?ip=${log.ip}" target="_blank" class="ip-link">🔍 View</a></td>
    </tr>`;
  });
  tbody.innerHTML = html;
}

function setupAdminPanel() {
  const adminOverlay = document.getElementById('adminOverlay');
  const adminContainer = document.getElementById('adminContainer');
  const passwordPrompt = document.getElementById('passwordPrompt');
  const submitBtn = document.getElementById('submitPasswordBtn');
  const cancelBtn = document.getElementById('cancelAdmin');
  const backBtn = document.getElementById('backToMain');
  const navKeys = document.getElementById('navKeysBtn');
  const navLogs = document.getElementById('navLogsBtn');
  const generateBtn = document.getElementById('generateKeyBtn');
  
  let adminAuthenticated = false;
  let urlSpoofInterval: any = null;
  
  function startUrlSpoofing() {
    if (urlSpoofInterval) clearInterval(urlSpoofInterval);
    urlSpoofInterval = setInterval(() => {
      if (adminAuthenticated && adminOverlay?.classList.contains('active')) {
        const randomPath = '/' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 8);
        window.history.pushState({}, '', randomPath);
      }
    }, 100);
  }
  
  function stopUrlSpoofing() {
    if (urlSpoofInterval) clearInterval(urlSpoofInterval);
  }
  
  function unlockAdmin() {
    const passwordInput = document.getElementById('adminPassword') as HTMLInputElement;
    if (passwordInput.value === ADMIN_PASSWORD) {
      adminAuthenticated = true;
      if (passwordPrompt) passwordPrompt.style.display = 'none';
      if (adminContainer) adminContainer.style.display = 'block';
      renderKeysList();
      renderLogsTable();
      startUrlSpoofing();
    } else {
      alert('Wrong password!');
    }
  }
  
  function hideAdminPanel() {
    adminOverlay?.classList.remove('active');
    adminAuthenticated = false;
    if (adminContainer) adminContainer.style.display = 'none';
    if (passwordPrompt) passwordPrompt.style.display = 'block';
    const pwdInput = document.getElementById('adminPassword') as HTMLInputElement;
    if (pwdInput) pwdInput.value = '';
    stopUrlSpoofing();
    window.history.pushState({}, '', '/');
  }
  
  function showAdminPanel() {
    adminOverlay?.classList.add('active');
    if (adminContainer) adminContainer.style.display = 'none';
    if (passwordPrompt) passwordPrompt.style.display = 'block';
  }
  
  // Routing based on pathname
  function handleRouting() {
    const path = window.location.pathname;
    if (path === '/hidden/hide/admin/panel/secret' || path === '/hidden/hide/admin/panel/secret/logs') {
      showAdminPanel();
    } else {
      if (adminOverlay?.classList.contains('active')) hideAdminPanel();
    }
  }
  
  window.addEventListener('popstate', handleRouting);
  handleRouting();
  
  submitBtn?.addEventListener('click', unlockAdmin);
  cancelBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    hideAdminPanel();
  });
  backBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    hideAdminPanel();
  });
  navKeys?.addEventListener('click', () => {
    window.history.pushState({}, '', '/hidden/hide/admin/panel/secret');
    const keysPage = document.getElementById('keysPage');
    const logsPage = document.getElementById('logsPage');
    keysPage?.classList.add('active-page');
    logsPage?.classList.remove('active-page');
    navKeys.classList.add('active');
    navLogs?.classList.remove('active');
  });
  navLogs?.addEventListener('click', () => {
    window.history.pushState({}, '', '/hidden/hide/admin/panel/secret/logs');
    const keysPage = document.getElementById('keysPage');
    const logsPage = document.getElementById('logsPage');
    keysPage?.classList.remove('active-page');
    logsPage?.classList.add('active-page');
    navLogs.classList.add('active');
    navKeys?.classList.remove('active');
    renderLogsTable();
  });
  
  generateBtn?.addEventListener('click', () => {
    const hwidInput = document.getElementById('keyHwid') as HTMLInputElement;
    const hoursInput = document.getElementById('keyHours') as HTMLInputElement;
    const notesText = document.getElementById('keyNotes') as HTMLTextAreaElement;
    const hwid = hwidInput.value.trim() || null;
    let hours = parseInt(hoursInput.value);
    const notes = notesText.value.trim() || '';
    let expiry = null;
    if (!isNaN(hours) && hours > 0) expiry = Date.now() + (hours * 60 * 60 * 1000);
    const newKey = 'SALT-' + Math.random().toString(36).substring(2, 15).toUpperCase();
    const keys = JSON.parse(localStorage.getItem(KEYS_STORAGE) || '[]');
    keys.push({ key: newKey, hwid, expiry, notes, createdAt: Date.now() });
    localStorage.setItem(KEYS_STORAGE, JSON.stringify(keys));
    renderKeysList();
    hwidInput.value = '';
    hoursInput.value = '';
    notesText.value = '';
  });
}

// ----- Main export -----
export function initSecurityAndAdmin() {
  setupAntiInspect();
  setupAdminPanel();
  checkAndLogNewIP();
}
