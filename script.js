// Toggle Sidebar Width
document.querySelector('.menu').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main--content');
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('active');
});

// Dropdown Filter for Doctors
const filterDropdown = document.querySelector('.doctor--filter');
const doctorCards = document.querySelectorAll('.doctor--card');

filterDropdown.addEventListener('change', function() {
    const selectedValue = this.value;

    doctorCards.forEach(card => {
        const status = card.querySelector('p').className;
        if (selectedValue === 'all' || status === selectedValue) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Table Edit and Delete Buttons
document.querySelectorAll('.edit').forEach(editBtn => {
    editBtn.addEventListener('click', function() {
        // Get the closest row
        const row = this.closest('tr');
        // Get the first 'td' (the editable column)
        const firstTd = row.querySelector('td');

        // Create an input element with the current text as value
        const input = document.createElement('input');
        input.type = 'text';
        input.value = firstTd.innerText;

        // Replace the 'td' content with the input element
        firstTd.innerHTML = '';
        firstTd.appendChild(input);

        // Change the button to a "Save" button
        this.innerText = 'Save';

        // Change event listener to save changes
        this.removeEventListener('click', arguments.callee); // Remove the 'edit' event listener

        this.addEventListener('click', function() {
            // When clicked again, save the input value
            firstTd.innerText = input.value;
            this.innerText = 'Edit'; // Change the button back to 'Edit'

            // Restore the original edit functionality
            this.removeEventListener('click', arguments.callee);
            this.addEventListener('click', editBtn.click);
        });
    });
});

document.querySelectorAll('.delete').forEach(deleteBtn => {
    deleteBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this record?')) {
            this.closest('tr').remove();
        }
    });
});


// Add Doctor Functionality
// JavaScript file

// Arrays of doctor names and patient names
const doctor = [
    'Dr. John',
    'Dr. Johnson',
    'Dr. Williams',
    'Dr. Priya',
    'Dr. Brown',
    'Dr.Umar',
];

const patient = [
    'Antony Jona',
    'Cyril',
    'John Adams',
    'Thomas',
    'Kumar',
    'Arun',
    'kevin',
    'jesvi',
    'krishna',
    'logesh',
];

// Function to get a random item from an array
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Event listener for the "Add Doctor" button
document.getElementById('add-doctor').addEventListener('click', function() {
    // Get random doctor and patient names
    const doctor = getRandomItem(doctors);
    const patient = getRandomItem(patients);

    // Determine the status of the doctor (free or scheduled)
    const status = Math.random() > 0.5 ? 'free' : 'scheduled';

   
});

document.addEventListener('DOMContentLoaded', () => {
    // Function to add a new doctor
    function addDoctor() {
        const freeDoctors = Array.from(document.querySelectorAll('.doctor--card .free')).map(card => card.querySelector('img').alt);
        const scheduledDoctors = Array.from(document.querySelectorAll('.doctor--card .scheduled')).map(card => card.querySelector('img').alt);
        const patients = Array.from(document.querySelectorAll('.table tbody tr td:first-child')).map(td => td.innerText);
        
        if (freeDoctors.length === 0 || patients.length === 0) {
            alert('No free doctors or patients available');
            return;
        }
        
        const randomFreeDoctor = freeDoctors[Math.floor(Math.random() * freeDoctors.length)];
        const randomPatient = patients[Math.floor(Math.random() * patients.length)];
        
        alert(`Add ${randomFreeDoctor} to ${randomPatient}`);
    }

    // Function to add a new patient
    function addPatient() {
        const names = ['Antony Jona', 'Cyril', 'John Adams', 'Thomas', 'Kumar', 'Arun','kevin','jesvi','krishna','logesh',];
        const genders = ['Male', 'Female'];
        const statuses = ['Pending', 'Confirmed', 'Rejected'];
        
        const name = names[Math.floor(Math.random() * names.length)];
        const dateIn = new Date().toLocaleDateString('en-GB');
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const age = `${Math.floor(Math.random() * 80) + 20}kg`; // Random weight from 20kg to 100kg
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Create a new row
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${dateIn}</td>
            <td>${gender}</td>
            <td>${age}</td>
            <td class="${status.toLowerCase()}">${status}</td>
            <td><span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span></td>
        `;
        
        // Append the new row to the table
        const tableBody = document.querySelector('.recent--patients .table tbody');
        tableBody.appendChild(newRow);
    }

    // Event listeners
    document.querySelector('.add').addEventListener('click', addDoctor); // For adding doctors
    document.querySelector('.recent--patients .add').addEventListener('click', addPatient); // For adding patients
});

// Get the modal elements
const modal = document.getElementById('doctor-modal');
const modalImg = document.getElementById('modal-img');
const modalStatus = document.getElementById('modal-status');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.close-btn');

// Add event listener to each doctor card
document.querySelectorAll('.doctor--card').forEach(card => {
    card.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const content= this.querySelector('h3').textContent;
        const status = this.querySelector('p').textContent;

        // Set modal content
        modalImg.src = imgSrc;
        modalContent.textContent= content;
        modalStatus.textContent = status;

        // Display the modal
        modal.style.display = 'flex';
    });
});

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Data for patients and doctors
let doctors = [
    { name: 'Dr. John', status: 'Free' },
    { name: 'Dr. Hema', status: 'Scheduled' },
    { name: 'Dr. Williams', status: 'Free' },
    { name: 'Dr. Priya', status: 'Scheduled' }
];

let patients = [
    { name: 'Antony Jona', date: '14/09/2024', gender: 'Male', age: '50', status: 'Pending', assignedDoctor: '' },
    { name: 'Cyril', date: '15/09/2024', gender: 'Male', age: '54', status: 'Confirmed', assignedDoctor: '' }
];

// Function to render doctors
function renderDoctors() {
    const doctorCards = document.querySelector('.doctors--cards');
    doctorCards.innerHTML = '';
    doctors.forEach((doc) => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor--card';
        doctorCard.innerHTML = `
            <div class="img--box--cover">
                <div class="img--box">
                    <img src="doc.jpg" alt="${doc.name}">
                </div>
            </div>
            <h3>${doc.name}</h3>
            <p class="${doc.status.toLowerCase()}">${doc.status}</p>
        `;
        doctorCards.appendChild(doctorCard);
    });
}

// Function to render patients// Function to render doctors
function renderDoctors() {
    const doctorCards = document.querySelector('.doctors--cards');
    doctors.forEach((doc) => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor--card';
        doctorCard.innerHTML = `
            <div class="img--box--cover">
                <div class="img--box">
                    <img src="doc.jpg" alt="${doc.name}">
                </div>
            </div>
            <h3>${doc.name}</h3>
            <p class="${doc.status.toLowerCase()}">${doc.status}</p>
        `;
        doctorCards.appendChild(doctorCard);
    });
}// Function to render doctors
function renderDoctors() {
    const doctorCards = document.querySelector('.doctors--cards');
    doctors.forEach((doc) => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor--card';
        doctorCard.innerHTML = `
            <div class="img--box--cover">
                <div class="img--box">
                    <img src="doc.jpg" alt="${doc.name}">
                </div>
            </div>
            <h3>${doc.name}</h3>
            <p class="${doc.status.toLowerCase()}">${doc.status}</p>
        `;
        doctorCards.appendChild(doctorCard);
    });
}
function renderPatients() {
    const patientTableBody = document.querySelector('.recent--patients tbody');
    patientTableBody.innerHTML = '';
    patients.forEach((patient) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.date}</td>
            <td>${patient.gender}</td>
            <td>${patient.age}</td>
            <td>${patient.status}</td>
            <td>${patient.assignedDoctor || 'Not Assigned'}</td>
            <td><span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span></td>
        `;
        patientTableBody.appendChild(row);
    });
}

// Function to add random doctor
function addRandomDoctor() {
    const randomDoctor = {
        name: 'Dr. ' + Math.random().toString(36).substring(2, 7),
        status: Math.random() > 0.5 ? 'Free' : 'Scheduled'
    };
    doctors.push(randomDoctor);
    renderDoctors();
}

// Function to add random patient
function addRandomPatient() {
    const randomPatient = {
        name: 'Patient ' + Math.random().toString(36).substring(2, 7),
        date: new Date().toLocaleDateString(),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        age: Math.floor(Math.random() * 40) + 20,
        status: 'Pending',
        assignedDoctor: ''
    };
    patients.push(randomPatient);
    renderPatients();
}

// Function to assign a random doctor to a random patient
function assignRandomDoctorToPatient() {
    if (patients.length === 0 || doctors.length === 0) {
        alert('No patients or doctors available for assignment.');
        return;
    }

    // Get a random patient and a random free doctor
    const freeDoctors = doctors.filter(doctor => doctor.status === 'Free');
    if (freeDoctors.length === 0) {
        alert('No free doctors available for assignment.');
        return;
    }

    const randomPatient = patients[Math.floor(Math.random() * patients.length)];
    const randomDoctor = freeDoctors[Math.floor(Math.random() * freeDoctors.length)];

    // Assign doctor to patient and change doctor status
    randomPatient.assignedDoctor = randomDoctor.name;
    randomDoctor.status = 'Scheduled'; // Update doctor status to 'Scheduled'

    renderPatients();
    renderDoctors();

    // Pop-up message
    alert(`Assigned ${randomDoctor.name} to ${randomPatient.name}`);
}

// Event listeners for buttons
document.getElementById('add-doctor').addEventListener('click', addRandomDoctor);
document.getElementById('add-patient').addEventListener('click', addRandomPatient);
document.getElementById('assign-doctor').addEventListener('click', assignRandomDoctorToPatient);

// Initial render of doctors and patients
renderDoctors();
renderPatients();

// Function to render doctors
function renderDoctors() {
    
    const doctorCards = document.querySelector('.doctors--cards');
    doctors.forEach((doc) => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor--card';
        doctorCard.innerHTML = `
            <div class="img--box--cover">
                <div class="img--box">
                    <img src="doc.jpg" alt="${doc.name}">
                </div>
            </div>
            <h3>${doc.name}</h3>
            <p class="${doc.status.toLowerCase()}">${doc.status}</p>
        `;
        doctorCards.appendChild(doctorCard);

        doctorCards.style.overflowY = 'auto';
    });
}

// Function to add a new doctor
function addRandomDoctor() {
    doctors.length = 0;
    const randomDoctor = {
        name: 'Dr. ' + Math.random().toString(36).substring(2, 7),
        status: Math.random() > 0.5 ? 'Free' : 'Scheduled'
    };
    doctors.push(randomDoctor);
    renderDoctors();
}





