// NEURAL_NODE JavaScript Controller

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeTime();
    initializeNavigation();
    initializeActivityMonitor();
    initializeGuestbook();
    initializeEffects();
    updateUptime();
});

// Time Display
function initializeTime() {
    function updateTime() {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        document.getElementById('current-time').textContent = timeString;
        
        // Update last update date
        const dateString = now.toISOString().split('T')[0].replace(/-/g, '.');
        const lastUpdate = document.getElementById('last-update');
        if (lastUpdate) {
            lastUpdate.textContent = dateString;
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

// Navigation System
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    
                    // Add glitch effect on section change
                    section.classList.add('glitch');
                    setTimeout(() => {
                        section.classList.remove('glitch');
                    }, 300);
                }
            });
            
            // Play sound effect (if you add audio)
            playNavigationSound();
        });
    });
}

// Activity Monitor Canvas Animation
function initializeActivityMonitor() {
    const canvas = document.getElementById('activity-monitor');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Data points
    const dataPoints = [];
    const maxPoints = 50;
    
    // Initialize data
    for (let i = 0; i < maxPoints; i++) {
        dataPoints.push(Math.random() * height);
    }
    
    function drawMonitor() {
        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = '#003333';
        ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let i = 0; i < width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        
        // Horizontal lines
        for (let i = 0; i < height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }
        
        // Draw data line
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 5;
        
        ctx.beginPath();
        for (let i = 0; i < dataPoints.length; i++) {
            const x = (i / (dataPoints.length - 1)) * width;
            const y = dataPoints[i];
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Update data
        dataPoints.shift();
        const newValue = dataPoints[dataPoints.length - 1] + (Math.random() - 0.5) * 20;
        dataPoints.push(Math.max(10, Math.min(height - 10, newValue)));
        
        requestAnimationFrame(drawMonitor);
    }
    
    drawMonitor();
}

// Guestbook Functionality
function initializeGuestbook() {
    const submitBtn = document.querySelector('.submit-btn');
    if (!submitBtn) return;
    
    submitBtn.addEventListener('click', function() {
        const nameInput = document.querySelector('.guestbook-form input[type="text"]');
        const messageInput = document.querySelector('.guestbook-form textarea');
        
        if (!nameInput || !messageInput) return;
        
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        
        if (name && message) {
            addGuestbookEntry(name, message);
            nameInput.value = '';
            messageInput.value = '';
            
            // Add success animation
            this.textContent = '[MESSAGE TRANSMITTED]';
            this.style.background = '#00ff00';
            this.style.color = '#000000';
            
            setTimeout(() => {
                this.textContent = '[TRANSMIT MESSAGE]';
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        }
    });
}

function addGuestbookEntry(name, message) {
    const entriesContainer = document.querySelector('.guestbook-entries');
    if (!entriesContainer) return;
    
    const now = new Date();
    const dateString = now.toISOString().split('T')[0].replace(/-/g, '.');
    const timeString = now.toTimeString().split(' ')[0].substring(0, 5);
    
    const entry = document.createElement('div');
    entry.className = 'guestbook-entry';
    entry.innerHTML = `
        <div class="entry-header">
            <span class="entry-name">${escapeHtml(name)}</span>
            <span class="entry-time">${dateString} - ${timeString}</span>
        </div>
        <p class="entry-message">${escapeHtml(message)}</p>
    `;
    
    entriesContainer.insertBefore(entry, entriesContainer.firstChild);
    
    // Add fade-in animation
    entry.style.opacity = '0';
    entry.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        entry.style.transition = 'all 0.5s ease';
        entry.style.opacity = '1';
        entry.style.transform = 'translateY(0)';
    }, 10);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Visual Effects
function initializeEffects() {
    // Random glitch effect on title
    const title = document.querySelector('.site-title');
    if (title) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                title.classList.add('glitch');
                setTimeout(() => {
                    title.classList.remove('glitch');
                }, 200);
            }
        }, 3000);
    }
    
    // Typing effect for terminal lines
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeText(line, text);
        }, index * 500);
    });
    
    // Update visitor count
    updateVisitorCount();
}

function typeText(element, text) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, 30);
}

// Update visitor count (simulated)
function updateVisitorCount() {
    const visitorCount = document.getElementById('visitor-count');
    if (!visitorCount) return;
    
    // Get or set visitor count from localStorage
    let count = localStorage.getItem('visitorCount');
    if (!count) {
        count = Math.floor(Math.random() * 100) + 1;
    } else {
        count = parseInt(count) + 1;
    }
    
    localStorage.setItem('visitorCount', count);
    visitorCount.textContent = String(count).padStart(4, '0');
}

// Update uptime
function updateUptime() {
    const uptimeElement = document.getElementById('uptime');
    if (!uptimeElement) return;
    
    let seconds = 0;
    
    setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        uptimeElement.textContent = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

// Navigation sound effect (placeholder)
function playNavigationSound() {
    // You can add actual sound effects here
    // const audio = new Audio('sounds/nav.mp3');
    // audio.play();
}

// Music Player Functionality
const albums = [
    { artist: 'Wednesday', album: 'Bleeds' },
    { artist: 'Tyler Childers', album: 'Snipe Hunter' },
    { artist: 'Waxahatchee', album: 'Tigers Blood' },
    { artist: 'S.G. Goodman', album: 'Planting By The Signs' }
];

let currentAlbumIndex = 0;
let isPlaying = false;

function updateAlbumDisplay() {
    const artistEl = document.getElementById('current-artist');
    const albumEl = document.getElementById('current-album');
    
    if (artistEl && albumEl) {
        artistEl.textContent = albums[currentAlbumIndex].artist;
        albumEl.textContent = albums[currentAlbumIndex].album;
    }
}

function nextTrack() {
    currentAlbumIndex = (currentAlbumIndex + 1) % albums.length;
    updateAlbumDisplay();
    flashButton(event.target);
}

function previousTrack() {
    currentAlbumIndex = (currentAlbumIndex - 1 + albums.length) % albums.length;
    updateAlbumDisplay();
    flashButton(event.target);
}

function playPause() {
    isPlaying = !isPlaying;
    const button = event.target;
    button.textContent = isPlaying ? '❚❚' : '▶';
    flashButton(button);
}

function stopTrack() {
    isPlaying = false;
    const playButton = document.querySelector('.player-btn[onclick="playPause()"]');
    if (playButton) {
        playButton.textContent = '▶';
    }
    flashButton(event.target);
}

function flashButton(button) {
    if (!button) return;
    button.style.background = '#00ffff';
    button.style.color = '#000000';
    setTimeout(() => {
        button.style.background = '';
        button.style.color = '';
    }, 200);
}

// Easter Egg: Konami Code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiPattern)) {
        activateMatrixMode();
    }
});

function activateMatrixMode() {
    document.body.classList.add('matrix-mode');
    const title = document.querySelector('.site-title');
    if (title) {
        title.textContent = 'ICE_BREAKER_ACTIVATED';
        setTimeout(() => {
            title.textContent = 'NETRUNNER';
            document.body.classList.remove('matrix-mode');
        }, 5000);
    }
}

// Add CSS class for matrix mode
const style = document.createElement('style');
style.textContent = `
    .matrix-mode {
        animation: matrix 5s linear;
    }
    
    @keyframes matrix {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(180deg) saturate(2); }
    }
`;
document.head.appendChild(style);

// Console ASCII Art
console.log(`
%c
███╗   ██╗███████╗██╗   ██╗██████╗  █████╗ ██╗     
████╗  ██║██╔════╝██║   ██║██╔══██╗██╔══██╗██║     
██╔██╗ ██║█████╗  ██║   ██║██████╔╝███████║██║     
██║╚██╗██║██╔══╝  ██║   ██║██╔══██╗██╔══██║██║     
██║ ╚████║███████╗╚██████╔╝██║  ██║██║  ██║███████╗
╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                                                     
Welcome to the Neural Node. System initialized.
`, 'color: #00ffff; font-family: monospace;');