var users = [
  { username: "jolin", password: "2331140"},
  { username: "ketrick", password: "2331141"},
  { username: "jenifer", password: "2331142"},
  { username: "nanda", password: "2331144" },
  { username: "anggit", password: "2331149" }
];

function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var isValidUser = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      isValidUser = true;
      break;
    }
  }

  if (isValidUser) {
    window.location.href = "../Home Page/index.html";
  } else {
    alert("Login gagal. Periksa ID dan Password Anda.");
  }
}
