const dashboardBlogs = document.getElementById('dashboardBlogs');

const handleBlog = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const blogContent = document.querySelector('#blog').value.trim();

    if (title && blogContent) {

        const response = await fetch('/dashboard', {
            method: 'POST',
            body: JSON.stringify({ title, blogContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {

            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const handleComment = async (event) => {
    event.preventDefault();

    const commentContent = document.querySelector('#comment').value.trim();

    if (title && blogContent) {

        const response = await fetch('/comment', {
            method: 'POST',
            body: JSON.stringify({ commentContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {

            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

const handleDelete = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`dashboard/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {

            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};


// Turns elements into block
function showButtons() {
    let oneButton = document.getElementById("oneButton")
    let twoButton = document.getElementById("twoButton")

    oneButton.style.display = 'inline-block';
    twoButton.style.display = 'inline-block';
}

function noButtons() {
    let oneButton = document.getElementById("oneButton")
    let twoButton = document.getElementById("twoButton")

    oneButton.style.display = 'none';
    twoButton.style.display = 'none';
}



document
    .querySelector('.blogForm')
    .addEventListener('submit', handleBlog);

document
    .querySelector('.commentForm')
    .addEventListener('submit', handleComment);

document
    .querySelector('.deleteData')
    .addEventListener('submit', handleDelete);

dashboardBlogs.addEventListener("mouseover", showButtons);
dashboardBlogs.addEventListener("mouseout", noButtons);

