// Toggle between Login and Signup fields on the main screen
function toggleAuthView(showSignup) {
    const errorBox = document.getElementById('login-error');
    if(errorBox) errorBox.classList.add('hidden');
    
    if (showSignup) {
        document.getElementById('signin-section').classList.add('hidden');
        document.getElementById('signup-section').classList.remove('hidden');
    } else {
        document.getElementById('signup-section').classList.add('hidden');
        document.getElementById('signin-section').classList.remove('hidden');
    }
}

// Handle account registration
function handlePortalRegistration() {
    const name = document.getElementById('signup-name').value.trim();
    const role = document.getElementById('signup-role').value;
    const user = document.getElementById('signup-username').value.trim().toLowerCase();
    const pass = document.getElementById('signup-password').value.trim();
    const errorBox = document.getElementById('login-error');

    if (!name || !user || !pass) {
        errorBox.textContent = "Please fill in all registration fields.";
        errorBox.classList.remove('hidden');
        return;
    }

    // Save profile data locally along with their selected system role
    const profileData = { fullName: name, role: role, username: user, password: pass };
    localStorage.setItem(`user_${user}`, JSON.stringify(profileData));

    alert(`Registration successful! Registered as: ${role}. You can now log in.`);
    toggleAuthView(false);
    document.getElementById('login-username').value = user;
}

// Handle signing into an account
function handlePortalLoginVerification() {
    const userInput = document.getElementById('login-username').value.trim().toLowerCase();
    const passInput = document.getElementById('login-password').value.trim();
    const errorBox = document.getElementById('login-error');

    // Default structural fallback account (Defaults to Student role)
    if (userInput === 'student' && passInput === 'password') {
        localStorage.setItem('activeSession', 'Alex Mercer');
        localStorage.setItem('activePathway', 'Digital Production (Student View)');
        window.location.href = './dashboard.html';
        return;
    }

    // Search local database profiles
    const savedUser = localStorage.getItem(`user_${userInput}`);
    if (savedUser) {
        const parsedProfile = JSON.parse(savedUser);
        if (parsedProfile.password === passInput) {
            // Save their session and pass their role directly into the workspace layout
            localStorage.setItem('activeSession', parsedProfile.fullName);
            localStorage.setItem('activePathway', `Portal Role: ${parsedProfile.role}`);
            window.location.href = './dashboard.html';
            return;
        }
    }

    // Handle invalid combinations
    errorBox.textContent = "Invalid tracking username or password combination.";
    errorBox.classList.remove('hidden');
}