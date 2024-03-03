const $ = document;
const firstNameSide = $.getElementById("firstNameSide");
const lastNameSide = $.getElementById("lastNameSide");
const topName = $.getElementById("topName");
const topEmail = $.getElementById("topEmail");
const sideUserName = $.getElementById("sideUserName");
const sideEmail = $.getElementById("sideEmail");
const nameInput = $.getElementById("nameInput");
const lastNameInput = $.getElementById("lastNameInput");
const userNameChangeInput = $.getElementById("userNameChangeInput");
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
      userNameChangeInput.value = admin.userName;
      sideEmail.innerHTML = admin.email;
      firstNameSide.innerHTML = admin.firstName;
      lastNameSide.innerHTML = admin.lastName;
      nameInput.value = admin.firstName;
      lastNameInput.value = admin.lastName;
      emailInput.value = admin.email;
    });
};

const cleaner = () => {
  (nameInput.value = ""),
    (lastNameInput.value = ""),
    (userNameChangeInput.value = ""),
    (newPassword.value = ""),
    (newPasswordConfirm.value = ""),
    (emailInput.value = "");
};

const changeInfo = () => {
  mainAdminID = localStorage.getItem("loginId");
  if (newPassword.value) {
    if (newPassword.value == newPasswordConfirm.value) {
      let newInfos = {
        firstName: nameInput.value,
        lastName: lastNameInput.value,
        userName: userNameChangeInput.value,
        password: newPasswordConfirm.value,
        email: emailInput.value,
      };

      fetch(`http://localhost:3000/api/admins/${mainAdminID}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newInfos),
      }).then((res) => {
        console.log(res);
        cleaner();
        getMainAdmin();
      });
    } else {
      alert("اطلاعات به درستی وارد نشده اند");
    }
  } else {
    alert("چیزی تغییر نکرده است");
  }
};

window.addEventListener("load", getMainAdmin);
changeBtn.addEventListener("click", changeInfo);
