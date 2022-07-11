async function editForm(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const id = document.querySelector('#post-id').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-post').addEventListener('submit', editForm);