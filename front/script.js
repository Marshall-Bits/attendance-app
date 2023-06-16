const form = document.querySelector('form');
const responseElement = document.getElementById('response');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;

    fetch('http://localhost:5000/attendance', {
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
            throw new Error('Error en la respuesta del servidor');
        }
    })
    .then(data => {
        responseElement.textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
