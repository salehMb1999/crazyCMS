const $ = document;

const firstNameInput = $.getElementById("firstNameInput");
const secondNameInput = $.getElementById("secondNameInput");
const userNameInput = $.getElementById("userNameInput");
const registerBtn = $.getElementById("registerBtn");
const firstNameAlert = $.getElementById("firstNameAlert");
const secondNameAlert = $.getElementById("secondNameAlert");
const userNameAlert = $.getElementById("userNameAlert");
let firstNameValid,
  secondNameValid,
  userNameValid = null;
firstNameInput.addEventListener("keyup", () => {
  if (firstNameInput.value.length < 3) {
    firstNameAlert.classList.remove("hidden");
    firstNameValid = false;
  } else {
    firstNameAlert.classList.add("hidden");
    firstNameValid = true;
  }
});

secondNameInput.addEventListener("keyup", () => {
  if (secondNameInput.value.length < 4) {
    secondNameAlert.classList.remove("hidden");
    secondNameValid = false;
  } else {
    secondNameAlert.classList.add("hidden");
    secondNameValid = true;
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

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (firstNameValid && secondNameValid && userNameValid) {
    console.log("salam");
  } else {
    alert("اطلاعات به درستی وارد نشده اند!!");
  }
});
