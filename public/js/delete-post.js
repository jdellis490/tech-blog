async function deleteForm(event) {
    event.preventDefault();

    const id = document.querySelector('#post-id').value;
    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-post').addEventListener('click', deleteForm);