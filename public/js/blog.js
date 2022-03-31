const dashboardBlogs = document.getElementById('dashboardBlogs');
const blogForm = document.querySelector('.blogForm');
const commentForm = document.querySelector('.commentForm');
const updateForm = document.querySelector('.updateForm');
const deleteData = document.querySelector('.deleteData');

// handles blogs info and alerts errors to user
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

// handles comments info and alerts errors to user
const handleComment = async (event) => {
    event.preventDefault();

    const commentContent = document.querySelector('#comment').value.trim();

    if (commentContent) {

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

// handle blog update info and alerts errors to user
const handleUpdate = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const blogContent = document.querySelector('#blog').value.trim();
    let id = event.target.getAttribute('data-id');


    if (title && blogContent) {

        const response = await fetch(`/dashboard/${id}`, {
            method: 'PUT',
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

// deletes blog
const handleDelete = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id);
        const response = await fetch(`/dashboard/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {

            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};




// handles all the event listeners
const handleButtons = async () => {

    if (blogForm) {
        blogForm.addEventListener('submit', handleBlog);
    }

    if (commentForm) {
        commentForm.addEventListener('submit', handleComment);
    }
    if (deleteData) {
        deleteData.addEventListener('submit', handleDelete);
    }

    if (updateForm) {
        updateForm.addEventListener('submit', handleUpdate);
    }

}

handleButtons();