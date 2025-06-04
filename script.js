const API_BASE = '/backend/public';

async function getCsrfCookie() {
    await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
        credentials: 'include'
    });
}

async function splitWord() {
    const word = document.getElementById('wordInput').value;
    if (!word) {
        document.getElementById('part1').textContent = '';
        document.getElementById('part2').textContent = '';
        document.getElementById('part3').textContent = '';
        return;
    }

    await getCsrfCookie();

    const response = await fetch(`${API_BASE}/api/split-word`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ word })
    });

    if (!response.ok) {
        console.error('Split failed');
        return;
    }

    const data = await response.json();
    document.getElementById('part1').textContent = data.part1;
    document.getElementById('part2').textContent = data.part2;
    document.getElementById('part3').textContent = data.part3;
}

function drawCurve() {
    const canvas = document.getElementById('curveCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9; // 90% of the height

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define scale and translation for drawing
    const scale = 10; // Scale factor to make the curve visible
    const offsetX = canvas.width / 2; // Center horizontally
    const offsetY = canvas.height * 0.9; // Bottom of the canvas to align with the input-section

    // Draw curve
    ctx.beginPath();
    ctx.moveTo(-offsetX, offsetY); // Start point on the left

    for (let x = -offsetX; x <= offsetX; x++) {
        const y = -0.1 * (x / scale) ** 2;
        ctx.lineTo(x + offsetX, y * scale + offsetY);
    }

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

// Initialize the curve on page load and resize the canvas when the window is resized
window.onload = function() {
    drawCurve();
    window.addEventListener('resize', drawCurve);
};

// Add event listener to input field
document.getElementById('wordInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default action of Enter key
        splitWord(); // Call splitWord function on Enter key press
    }
});

async function register(name, email, password) {
    await getCsrfCookie();
    return fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ name, email, password })
    });
}

async function login(email, password) {
    await getCsrfCookie();
    return fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ email, password })
    });
}

async function logout() {
    await getCsrfCookie();
    return fetch(`${API_BASE}/api/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}

async function currentUser() {
    await getCsrfCookie();
    const res = await fetch(`${API_BASE}/api/user`, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
    return res.json();
}

async function splitHistory() {
    await getCsrfCookie();
    const res = await fetch(`${API_BASE}/api/split-history`, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
    return res.json();
}
