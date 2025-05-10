function startApp() {
  document.getElementById("introScreen").classList.add("hidden");
  document.getElementById("authContainer").classList.remove("hidden");
}

function toggleAuth() {
  document.getElementById("signupForm").classList.toggle("hidden");
  document.getElementById("loginForm").classList.toggle("hidden");
}

// function for signup and login form
function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  if (!email || !password) return alert("Fill all fields");
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
  alert("Account created! You can now login.");
  toggleAuth();

}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPassword) {
    // Store the current logged-in user
    localStorage.setItem("loggedInUser", email);

    document.getElementById("authContainer").classList.add("hidden");
    document.getElementById("mainNav").style.display = "block";
    showTab("car");
  } else {
    alert("Invalid login");
  }
}


// toggle password functionality
function togglePassword(id, el) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    el.classList.replace('bx-hide', 'bx-show');
  } else {
    input.type = 'password';
    el.classList.replace('bx-show', 'bx-hide');
  }
}

function showTab(tabId) {
  document.querySelectorAll('.form-container').forEach(div => {
    div.style.display = "none";
  });

  document.getElementById(tabId).style.display = "block";

  if (tabId === "dashboard") {
    displaySavedEntries();
  }
}
console.log("Save Car Service function triggered!");
// Save Car Entry
function saveCarService() {
  const clientName = document.getElementById('carClientName').value;
  const amount = document.getElementById('carAmount').value;
  const vehicleName = document.getElementById('carVehicleName').value;
  const vehicleModel = document.getElementById('carVehicleModel').value;
  const chassisNumber = document.getElementById('carChassisNumber').value;
  const regNumber = document.getElementById('carRegNumber').value;
  const color = document.getElementById('carColor').value;
  const date = new Date().toISOString().split('T')[0];
  const status = 'In progress';
  const serviceType = 'Car Service';

  const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];

  const editIndex = document.getElementById("editIndex").value;

  const newEntry = {
    clientName,
    serviceType,
    amount,
    vehicleName,
    vehicleModel,
    chassisNumber,
    regNumber,
    color,
    status,
    date
  };

  if (editIndex !== "") {
    // Update existing entry
    savedEntries[editIndex] = newEntry;
    document.getElementById("editIndex").value = ""; // Reset after update
    alert("Car entry updated!");
  } else {
    // Add new entry
    savedEntries.push(newEntry);
    alert("Car entry saved!");
  }

  localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
  displaySavedEntries();
  document.getElementById("carForm").reset();
  document.getElementById("carPreview").innerHTML = "";
}


console.log("Save wheel Service function triggered!");
// Save Wheel Entry
function saveWheelService() {
  const clientName = document.getElementById('wheelClientName').value;
  const amount = document.getElementById('wheelAmount').value;
  const wheelSize = document.querySelector('#wheelForm input[placeholder="Wheel Size"]').value;
  const numberOfSets = document.querySelector('#wheelForm input[placeholder="Number of Sets"]').value;
  const status = document.querySelector('#wheelForm select').value;
  const serviceType = 'Wheel Service';
  const date = new Date().toISOString().split('T')[0];

  const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];

  const editIndex = document.getElementById("editIndex").value;

  const newEntry = {
    clientName,
    serviceType,
    amount,
    wheelSize,
    numberOfSets,
    status,
    date
  };

  if (editIndex !== "") {
    savedEntries[editIndex] = newEntry;
    document.getElementById("editIndex").value = "";
    alert("Wheel entry updated!");
  } else {
    savedEntries.push(newEntry);
    alert("Wheel entry saved!");
  }

  localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
  displaySavedEntries();
  document.getElementById("wheelForm").reset();
  document.getElementById("wheelPreview").innerHTML = "";
}


// display saved functions section
function displaySavedEntries(filterYear = "", filterMonth = "") {
  const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];
  const container = document.getElementById('savedEntries');
  const loggedInUser = localStorage.getItem("loggedInUser");

  container.innerHTML = "";

  savedEntries.forEach((entry, index) => {
    if (!entry.date || typeof entry.date !== "string" || !entry.date.includes("-")) return;
const [year, month] = entry.date.split("-");


    if ((filterYear && year !== filterYear) || (filterMonth && month !== filterMonth)) return;

    const div = document.createElement("div");
    div.classList.add("entry");

    // Only show edit button if admin is logged in
    const isAdmin = loggedInUser === "saviourelijah006@gmail.com";

    div.innerHTML = `
      <strong>${entry.clientName}</strong> - <em>${entry.serviceType}</em><br>
      <span>Amount: <strong>₦${entry.amount}</strong></span><br>
      <span>Status: <strong>${entry.status}</strong></span><br>
      <span>Date: ${entry.date}</span><br>
      <button onclick="viewEntry(${index})">View</button>
      ${isAdmin ? `<button onclick="editEntry(${index})">Edit</button>` : ""}
      <button onclick="deleteEntry(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}


function filterByYear() {
  const selectedYear = document.getElementById("yearFilter").value;
  const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];
  const container = document.getElementById('savedEntries');
  container.innerHTML = '';

  const filtered = selectedYear
  ? savedEntries.filter(e => e.date && typeof e.date === 'string' && e.date.split('-')[0] === selectedYear)
    : savedEntries;

  filtered.forEach((entry, index) => {
    const div = document.createElement('div');
    div.classList.add('entry');
    div.innerHTML = `
      <strong>${entry.clientName}</strong> - ${entry.serviceType}<br>
      Amount: ₦${entry.amount}<br>
      Status: ${entry.status}<br>
      Date: ${entry.date}<br>
      <button onclick="viewEntry(${index}, ${isWheel})">View</button>
      <button onclick="editEntry(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
    `;
    container.appendChild(div);
  });
}


function viewEntry(index) {
  const savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];
  const entry = savedEntries[index];

  let details = `
    <strong>Client Name:</strong> ${entry.clientName}<br>
    <strong>Service Type:</strong> ${entry.serviceType}<br>
    <strong>Amount:</strong> ₦${entry.amount}<br>
    <strong>Status:</strong> ${entry.status}<br>
    <strong>Date:</strong> ${entry.date}<br>
  `;

  if (entry.serviceType === 'Car Service') {
    details += `
      <strong>Vehicle Name:</strong> ${entry.vehicleName}<br>
      <strong>Vehicle Model:</strong> ${entry.vehicleModel}<br>
      <strong>Chassis Number:</strong> ${entry.chassisNumber}<br>
      <strong>Reg Number:</strong> ${entry.regNumber}<br>
      <strong>Color:</strong> ${entry.color}<br>
    `;
  } else if (entry.serviceType === 'Wheel Service') {
    details += `
      <strong>Wheel Size:</strong> ${entry.wheelSize || "N/A"}<br>
      <strong>Number of Sets:</strong> ${entry.numberOfSets || "N/A"}<br>
    `;
  }

  document.getElementById("viewDetails").innerHTML = details;
  document.getElementById("viewModal").classList.remove("hidden");
}

function closeViewModal() {
  document.getElementById("viewModal").style.display = "none";
}

function deleteEntry(index) {
  const savedEntries = JSON.parse(localStorage.getItem("savedEntries")) || [];
  if (!confirm("Are you sure you want to delete this entry?")) return;
  savedEntries.splice(index, 1);
  localStorage.setItem("savedEntries", JSON.stringify(savedEntries));
  displaySavedEntries();
}

// edit entry function
function editEntry(index) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const isAdmin = loggedInUser === "saviourelijah006@gmail.com";

  if (!isAdmin) {
    alert("Only admin is allowed to edit entries.");
    return;
  }

  const savedEntries = JSON.parse(localStorage.getItem("savedEntries") || "[]");
  const entry = savedEntries[index];

  // Fill the form based on the service type
  if (entry.serviceType === 'Car Service') {
    showTab("car");
    document.getElementById("carClientName").value = entry.clientName || '';
    document.getElementById("carAmount").value = entry.amount || '';
    document.getElementById("carVehicleName").value = entry.vehicleName || '';
    document.getElementById("carVehicleModel").value = entry.vehicleModel || '';
    document.getElementById("carChassisNumber").value = entry.chassisNumber || '';
    document.getElementById("carRegNumber").value = entry.regNumber || '';
    document.getElementById("carColor").value = entry.color || '';
  } else if (entry.serviceType === 'Wheel Service') {
    showTab("wheel");
    document.getElementById("wheelClientName").value = entry.clientName || '';
    document.getElementById("wheelAmount").value = entry.amount || '';
    document.querySelector('#wheelForm input[placeholder="Wheel Size"]').value = entry.wheelSize || '';
    document.querySelector('#wheelForm input[placeholder="Number of Sets"]').value = entry.numberOfSets || '';
    document.querySelector('#wheelForm select').value = entry.status || 'Pending';
  }

  // Store index in hidden input and localStorage for reference on save
  document.getElementById("editIndex").value = index;
  localStorage.setItem("editIndex", index);
}


// ✅ Real-time preview logic
function updateCarPreview() {
  const clientName = document.querySelector('#carForm input[placeholder="Client Name"]').value;
  const amount = document.querySelector('#carForm input[placeholder="Amount"]').value;

  document.getElementById("carPreview").innerHTML = `
    <div class="entry live-preview">
      <strong>${clientName || 'Client Name'}</strong> - Car Service<br>
      Amount: ₦${amount || '0.00'}<br>
      Status: Pending<br><br>
    </div>
  `;
}

function updateWheelPreview() {
  const clientName = document.querySelector('#wheelForm input[placeholder="Client Name"]').value;
  const amount = document.querySelector('#wheelForm input[placeholder="Amount"]').value;

  document.getElementById("wheelPreview").innerHTML = `
    <div class="entry live-preview">
      <strong>${clientName || 'Client Name'}</strong> - Wheel Service<br>
      Amount: ₦${amount || '0.00'}<br>
      Status: Pending<br><br>
    </div>
  `;
}
// Attach input listeners
document.addEventListener("DOMContentLoaded", () => {
  const carInputs = document.querySelectorAll("#carForm input");
  const wheelInputs = document.querySelectorAll("#wheelForm input");

  carInputs.forEach(input => {
    input.addEventListener("input", updateCarPreview);
  });

  wheelInputs.forEach(input => {
    input.addEventListener("input", updateWheelPreview);
  });
});
function closeViewModal() {
  document.getElementById("viewModal").classList.add("hidden");
}
function logout() {
  // Optionally clear session data
  // localStorage.removeItem('userEmail');
  // localStorage.removeItem('userPassword');

  // Hide all tabs
  document.querySelectorAll('.form-container').forEach(div => {
    div.style.display = "none";
  });

  document.getElementById("mainNav").style.display = "none";
  document.getElementById("authContainer").classList.remove("hidden");

  // Show login form directly
  document.getElementById("signupForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
}
function cleanCorruptEntries() {
  let entries = JSON.parse(localStorage.getItem("savedEntries")) || [];
  const validEntries = entries.filter(e => e.date && typeof e.date === "string" && e.date.includes("-"));
  if (entries.length !== validEntries.length) {
    localStorage.setItem("savedEntries", JSON.stringify(validEntries));
    console.log("Removed corrupt entries.");
  }
}
cleanCorruptEntries(); // Call on page load
// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Attach event listeners to both forms
  document.getElementById("carForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    saveCarService();   // Call your save function
  });

  document.getElementById("wheelForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    saveWheelService(); // Call your save function
  });
});
