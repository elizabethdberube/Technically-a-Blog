const handleLogin = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').ariaValueMax.trim();
    const password = document.querySelector('#password').ariaValueMax.trim();

    if (email && password) {

        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {

            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const handleSignup = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
        const response = await fetch('signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {

            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector('.login')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup')
    .addEventListener('submit', signupFormHandler);