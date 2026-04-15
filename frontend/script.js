
const API = "http://localhost:5000/api";

function register() {
  fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  }).then(() => alert("Registered"));
}

function login() {
  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Invalid login");
    }
    return res.json();
  })
  .then(data => {
    localStorage.setItem("user", JSON.stringify(data));

    if (data.role === "admin") {
      window.location = "admin.html";
    } else {
      window.location = "dashboard.html";
    }
  })
  .catch(err => {
    alert("❌ Invalid Email or Password");
  });
}

function book() {
  let user = JSON.parse(localStorage.getItem("user"));
  fetch(API + "/bookings", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      tentName: tentName.value,
      eventDate: date.value,
      guests: guests.value,
      location: location.value,
      userId: user._id
    })
  }).then(() => alert("Booked"));
}

function getBookings() {
  fetch("http://localhost:5000/api/bookings")
    .then(res => res.json())
    .then(data => {

      // 📊 Stats
      document.getElementById("total").innerText = data.length;

      document.getElementById("pending").innerText =
        data.filter(b => b.status === "Pending").length;

      document.getElementById("confirmed").innerText =
        data.filter(b => b.status === "Confirmed").length;

      // 📦 Booking list
      document.getElementById("data").innerHTML =
      data.map(b => `
        <div class="card">
          <p><b>🏕️ Tent:</b> ${b.tentName}</p>
          <p><b>📌 Status:</b> ${b.status}</p>
      
          <button class="approve" onclick="updateStatus('${b._id}','Confirmed')">
            ✅ Approve
          </button>
      
          <button class="reject" onclick="updateStatus('${b._id}','Cancelled')">
            ❌ Reject
          </button>
        </div>
      `).join("");
    });
}