// Navigation
function showLogin() {
    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
  }
  
  function showSignup() {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("signupPage").classList.remove("hidden");
  }
  
  function handleSignup() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    alert("Sign up successful! Please log in.");
    showLogin();
  }
  
  function handleLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
  
    if (email === storedEmail && password === storedPassword) {
      document.getElementById("loginPage").classList.add("hidden");
      document.getElementById("mainApp").classList.remove("hidden");
    } else {
      alert("Invalid credentials");
    }
  }
  
  function showTab(tab, e) {
    document.querySelectorAll(".form-section").forEach(el => el.classList.remove("active"));
    document.getElementById(tab).classList.add("active");
  
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
  
    if (tab === "dashboard") renderDashboard();
  }
  
  // CAR SERVICE
  function submitCarService() {
    const data = {
      type: "Car",
      client: document.getElementById("carClient").value,
      date: document.getElementById("carDate").value,
      time: document.getElementById("carTime").value,
      dep: document.getElementById("carDep").value,
      vehicle: document.getElementById("carVehicle").value,
      model: document.getElementById("carModel").value,
      reg: document.getElementById("carReg").value,
      chassis: document.getElementById("carChassis").value,
      color: document.getElementById("carColor").value,
      amount: document.getElementById("carAmount").value,
      advance: document.getElementById("carAdvance").value,
      desc: document.getElementById("carDesc").value
    };
    saveRecord(data);
  }
  
  // WHEEL SERVICE
  function submitWheelService() {
    const data = {
      type: "Wheel",
      client: document.getElementById("wheelClient").value,
      date: document.getElementById("wheelDate").value,
      time: document.getElementById("wheelTime").value,
      dep: document.getElementById("wheelDep").value,
      size: document.getElementById("wheelSize").value,
      amount: document.getElementById("wheelAmount").value,
      advance: document.getElementById("wheelAdvance").value,
      sets: document.getElementById("wheelSets").value
    };
    saveRecord(data);
  }
  
  // SAVE & LOAD RECORDS
  function saveRecord(record) {
    let records = JSON.parse(localStorage.getItem("records") || "[]");
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));
    alert("Record saved!");
  }
  
  // DASHBOARD
  function renderDashboard() {
    let records = JSON.parse(localStorage.getItem("records") || "[]");
    let list = document.getElementById("recordList");
    list.innerHTML = "";
  
    records.forEach((rec, index) => {
      let div = document.createElement("div");
      div.className = "record";
      div.innerHTML = `
        <strong>${rec.type} Service</strong><br>
        <small>${rec.client}</small><br>
        <button onclick="deleteRecord(${index})">Delete</button>
      `;
      list.appendChild(div);
    });
  }
  
  function deleteRecord(index) {
    let records = JSON.parse(localStorage.getItem("records") || "[]");
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    renderDashboard();
  }
  
  // DARK MODE
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  let sampleClients = [
    { name: 'John Doe', id: 1 },
    { name: 'Jane Smith', id: 2 }
  ];
  
  let selectedClientId = null;
  
  function renderClients() {
    clientList.innerHTML = '';
    sampleClients.forEach(client => {
      const card = document.createElement("div");
      card.className = "client-card";
      card.innerHTML = `
        <span>${client.name}</span>
        <div class="client-actions">
          <i class='bx bx-show' title="View" onclick="viewClient(${client.id})"></i>
          <i class='bx bx-edit' title="Edit" onclick="editClient(${client.id})"></i>
          <i class='bx bx-trash' title="Delete" onclick="deleteClient(${client.id})"></i>
        </div>
      `;
      clientList.appendChild(card);
    });
  }
  
  function viewClient(id) {
    const client = sampleClients.find(c => c.id === id);
    document.getElementById('modalTitle').innerText = "Viewing Client";
    document.getElementById('modalClientName').value = client.name;
    document.getElementById('modalClientName').disabled = true;
    document.getElementById('clientModal').style.display = 'block';
  }
  
  function editClient(id) {
    const client = sampleClients.find(c => c.id === id);
    selectedClientId = id;
    document.getElementById('modalTitle').innerText = "Editing Client";
    document.getElementById('modalClientName').value = client.name;
    document.getElementById('modalClientName').disabled = false;
    document.getElementById('clientModal').style.display = 'block';
  }
  
  function saveClientEdit() {
    const updatedName = document.getElementById('modalClientName').value;
    const client = sampleClients.find(c => c.id === selectedClientId);
    if (client) {
      client.name = updatedName;
      renderClients();
      closeModal();
    }
  }
  
  function deleteClient(id) {
    if (confirm("Are you sure you want to delete this client?")) {
      sampleClients = sampleClients.filter(c => c.id !== id);
      renderClients();
    }
  }
  
  function closeModal() {
    document.getElementById('clientModal').style.display = 'none';
    selectedClientId = null;
  }
  
  renderClients();
  