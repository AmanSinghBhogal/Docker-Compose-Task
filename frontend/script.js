document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Make a GET request to fetch all objects
        const getResponse = await fetch('http://expressapp:5000/people');
        const allObjects = await getResponse.json();
        console.log('GET request successful:', allObjects);
        
        const tableBody = document.querySelector('#userDataTable tbody');
    
        // Populate the table with data
        allObjects.forEach(item => {
          const row = tableBody.insertRow();
          const nameCell = row.insertCell(0);
          const ageCell = row.insertCell(1);
          nameCell.textContent = item.name;
          ageCell.textContent = item.age;
        });

    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get the form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const age = formData.get('age');
    
    // Make a POST request to your API
    try {
      const response = await fetch('http://expressapp:5000/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age })
      });
      const data = await response.json();
      console.log('POST request successful:', data);
      
    } catch (error) {
      console.error('Error:', error);
    }
  });