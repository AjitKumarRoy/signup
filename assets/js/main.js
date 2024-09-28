
//Animation for the login and signup form
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.querySelector('.container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});



//Now the real code starts here

// Password strength meter
document.getElementById('signup-password').addEventListener('input', updatePasswordStrengthMeter);

function updatePasswordStrengthMeter() {
    const password = document.getElementById('signup-password').value;
    const strengthBar = document.getElementById('password-strength-bar');
    const strength = calculatePasswordStrength(password);

    strengthBar.style.width = strength + '%';

    if (strength < 30) {
        strengthBar.style.backgroundColor = 'red';
    } else if (strength < 60) {
        strengthBar.style.backgroundColor = 'orange';
    } else if (strength < 80) {
        strengthBar.style.backgroundColor = 'yellow';
    } else {
        strengthBar.style.backgroundColor = 'green';
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
}


// Function to toggle password visibility
function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}




// Function to handle signup for multiple users
function signup() {
    const username = document.getElementById("signup-username").value;
    const useremail = document.getElementById("signup-useremail").value;
    const password = document.getElementById("signup-password").value;

    if (username && password) {
        // Get existing users from localStorage, or initialize an empty array if none exist
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the username already exists --- by email
        const userExists = users.some(user => user.user_email === useremail);

        if (userExists) {
            //document.getElementById("message").textContent = "Username already exists!";
            //alert('Username already exists!');
            showToast('User already exists!', false);
        } else {
            // Add the new user to the users array
            users.push({ username: username,user_email: useremail ,password: password });

            // Save the updated users array to localStorage
            localStorage.setItem("users", JSON.stringify(users));



            // Clear the input fields after signup
            document.getElementById("signup-username").value = "";
            document.getElementById("signup-useremail").value = "";
            document.getElementById("signup-password").value = "";


            //document.getElementById("message").textContent = "Signup successful! You can now login.";
            //alert('Signup successful! You can now login.');
            showToast('Signup successful! Please log in.', true);

            // Switch to the login tab after signup
            container.classList.remove('right-panel-active');
        }
    } else {
        //document.getElementById("message").textContent = "Please enter both username and password.";
        //alert('Please enter both username and password.');
        showToast('Please enter both email and password.', false);
    }
}

// Function to handle login for multiple users
function login() {
    const useremail = document.getElementById("login-useremail").value;
    const password = document.getElementById("login-password").value;

    // Get the users array from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the entered useremail and password match any existing user
    const user = users.find(user => user.user_email === useremail && user.password === password);

    if (user) {
        // Login successful, redirect to home page

        // Store the username in localStorage for showing in home page
        localStorage.setItem('username', user.username); // Store the username in localStorage

        //document.getElementById("message").textContent = "Login successful! Redirecting to home page...";
        //alert('Login successful! Redirecting to home page...');
        showToast('Login successful! Redirecting to home page...', true);
        

        // Clear the input fields after login
        document.getElementById("login-useremail").value = "";
        document.getElementById("login-password").value = "";

        // Redirect to home page after 1 second
        setTimeout(() => {
            window.location.href = "./home.html"; // Redirect to home page
        }, 1000); // Delay for 1 second to show the success message

    } else {
        // Login failed, show error message
        //document.getElementById("message").textContent = "Invalid username or password.";
        //alert('Invalid username or password.');
        showToast('Invalid email or password.', false);

        if (useremail === "" || password === "") {
            showToast('Please enter both email and password.', false);
        }
    }
}




// Function to show toast messages
function showToast(message, isSuccess) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    if (isSuccess) {
        toast.classList.add('success');
    } else {
        toast.classList.add('failure');
    }
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Function to handle logout
function logout() {
    // Redirect to login page
    window.location.href = "./index.html";
}
