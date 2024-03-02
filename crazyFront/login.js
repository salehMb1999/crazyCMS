const $ = document;

const passwordInput = $.getElementById("passwordInput");
const userNameInput = $.getElementById("userNameInput");
const loginBtn = $.getElementById("loginBtn");
const passwordAlert = $.getElementById("passwordAlert");
const userNameAlert = $.getElementById("userNameAlert");
let firstNameValid,
  paswordValid,
  userNameValid = null;
let loginId = null;
passwordInput.addEventListener("keyup", () => {
  if (passwordInput.value.length < 4) {
    passwordAlert.classList.remove("hidden");
    paswordValid = false;
  } else {
    passwordAlert.classList.add("hidden");
    paswordValid = true;
  }
});

userNameInput.addEventListener("keyup", () => {
  if (userNameInput.value.length < 4) {
    userNameAlert.classList.remove("hidden");
    userNameValid = false;
  } else {
    userNameAlert.classList.add("hidden");
    userNameValid = true;
  }
});
const cleaner = () => {
  userNameInput.value = "";
  passwordInput.value = "";
};
loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let adminUserName = userNameInput.value;
  let adminPassword = passwordInput.value;

  fetch("http://localhost:3000/api/admins", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((datas) => {
      let isAdmin = datas.some((admin) => {
        return admin.userName == adminUserName;
      });
      if (isAdmin) {
        console.log("bud");
        let admin = datas.find((data) => {
          return data.userName == adminUserName;
        });

        if (
          admin.userName == adminUserName &&
          admin.password == adminPassword
        ) {
          loginId = admin._id;
          console.log("success :)");
          localStorage.setItem("loginId", loginId);
          location.href = "http://127.0.0.1:5500/crazyFront/panel-users.html";
          cleaner();
        } else {
          alert("اطلاعات به درستی وارد نشده اند");
          localStorage.setItem("isLogin", "false");

          cleaner();
        }
      } else {
        alert("اطلاعات به درستی وارد نشده اند");
        localStorage.setItem("isLogin", "false");
        cleaner();
      }
    });
});
