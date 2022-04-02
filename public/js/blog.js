const dashboardBlogs = document.getElementById('dashboardBlogs');
const blogForm = document.querySelector('.blogForm');
const commentForm = document.querySelector('.commentForm');
const updateForm = document.querySelector('.updateForm');


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

    const comments = document.querySelector('#comment').value.trim();
    const blog_id = event.target.getAttribute('data-blog-id');

    if (comments) {

        const response = await fetch(`/comment/${blog_id}`, {
            method: 'POST',
            body: JSON.stringify({ comments }),
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

// handles delete info
const handleDelete = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

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
    const delete_buttons = document.querySelectorAll('.deleteBut');

    if (blogForm) {
        blogForm.addEventListener('submit', handleBlog);
    }

    if (commentForm) {
        commentForm.addEventListener('submit', handleComment);
    }



    if (updateForm) {
        updateForm.addEventListener('submit', handleUpdate);

    }

    delete_buttons.forEach((delete_button) => {

        delete_button.addEventListener('submit', handleDelete);

    });

};





handleButtons();

