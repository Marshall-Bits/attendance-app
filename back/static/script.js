const form = document.querySelector('form');
const responseElement = document.getElementById('response');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;

    fetch('http://192.168.0.27:5000/attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Server error');
            }
        })
        .then(data => {
            responseElement.textContent = data;
            form.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
