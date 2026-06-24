/**
 * T-Level Work Experience Hub - Central State Manager
 * Uses browser localStorage to sync state across all independent files.
 */

// 1. SESSION MANAGEMENT
function getActiveSession() {
    return localStorage.getItem('activeSession') || 'Taylor Brooke';
}

function getActivePathway() {
    return localStorage.getItem('activePathway') || 'Digital Production, Design & Development';
}

function handleSignOut() {
    localStorage.removeItem('activeSession');
    window.location.href = './index.html';
}

// 2. LOGBOOK & HOURS METRICS
function getUserLogs() {
    const user = getActiveSession();
    return JSON.parse(localStorage.getItem(`logs_${user}`)) || [];
}

function saveNewLogEntry(date, hours, reflection) {
    const user = getActiveSession();
    const currentLogs = getUserLogs();
    
    currentLogs.push({
        id: Date.now(),
        date: date,
        hours: parseFloat(hours),
        reflection: reflection
    });
    
    localStorage.setItem(`logs_${user}`, JSON.stringify(currentLogs));
    recalculateAggregateHours();
}

function recalculateAggregateHours() {
    const logs = getUserLogs();
    const total = logs.reduce((sum, entry) => sum + entry.hours, 0);
    const user = getActiveSession();
    localStorage.setItem(`total_hours_${user}`, total);
    return total;
}

function getTotalHoursLogged() {
    const user = getActiveSession();
    return parseFloat(localStorage.getItem(`total_hours_${user}`)) || 15.5; // Defaults to your base 15.5
}

// 3. ACCESSIBILITY COOKIE-SIMULATION
function applyAccessibilityPreferences() {
    const savedScale = localStorage.getItem('access_text_scale') || 'small';
    const savedContrast = localStorage.getItem('access_contrast_mode') === 'true';
    const body = document.body;

    if (!body) return;

    // Apply scale profiles
    body.classList.remove('text-sm', 'text-base', 'text-lg');
    if (savedScale === 'large') body.classList.add('text-base');
    else if (savedScale === 'xlarge') body.classList.add('text-lg');
    else body.classList.add('text-sm');

    // Apply contrast layers
    if (savedContrast) {
        body.style.filter = "contrast(1.2) saturate(1.1)";
    } else {
        body.style.filter = "none";
    }
}

// Automatically sync preferences when any module window loads
document.addEventListener("DOMContentLoaded", () => {
    applyAccessibilityPreferences();
});