const $ = document;
const firstNameSide = $.getElementById("firstNameSide");
const lastNameSide = $.getElementById("lastNameSide");
const topName = $.getElementById("topName");
const topEmail = $.getElementById("topEmail");
const sideUserName = $.getElementById("sideUserName");
const sideEmail = $.getElementById("sideEmail");
const nameInput = $.getElementById("nameInput");
const lastNameInput = $.getElementById("lastNameInput");
const currentPassword = $.getElementById("currentPassword");
const newPassword = $.getElementById("newPassword");
const newPasswordConfirm = $.getElementById("newPasswordConfirm");
const emailInput = $.getElementById("emailInput");
const changeBtn = $.getElementById("changeBtn");

let mainAdminID = null;
const getMainAdmin = () => {
  mainAdminID = localStorage.getItem("loginId");
  topName.innerHTML = "";
  topEmail.innerHTML = "";
  sideUserName.innerHTML = "";
  sideEmail.innerHTML = "";
  firstNameSide.innerHTML = "";
  lastNameSide.innerHTML = "";

  fetch(`http://localhost:3000/api/admins/${mainAdminID}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((admin) => {
      console.log(admin);
      topName.innerHTML = admin.firstName;
      topEmail.innerHTML = admin.email;
      sideUserName.innerHTML = admin.userName;
      sideEmail.innerHTML = admin.email;
      firstNameSide.innerHTML = admin.firstName;
      lastNameSide.innerHTML = admin.lastName;
      nameInput.value = admin.firstName;
      lastNameInput.value = admin.lastName;
      currentPassword.value = admin.password;
      emailInput.value = admin.email;
    });
};

window.addEventListener("load", getMainAdmin);
