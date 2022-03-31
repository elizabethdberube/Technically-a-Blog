const signup = document.querySelector('.signup');
const login = document.querySelector('.login');

const handleLogin = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name && password) {

        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {

            document.location.replace('/dashboard');
        } else {
            let jsonResponse = await response.json();
            alert(jsonResponse.message);
        }
    }
};

const handleSignup = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name && password) {
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {

            document.location.replace('/dashboard');
        } else {
            let jsonResponse = await response.json();
            alert(jsonResponse.message);
        }
    }
}

const handleSubmit = async () => {
    if (login) {
        login.addEventListener('submit', handleLogin);
    }

    if (signup) {
        signup.addEventListener('submit', handleSignup);
    }
}

handleSubmit();