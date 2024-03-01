const $ = document;
const sessionName = $.getElementById("sessionName");
const sessionDuration = $.getElementById("sessionDuration");
const sessionPrice = $.getElementById("sessionPrice");
const sessionCategory = $.getElementById("sessionCategory");
const addSessionBtn = $.getElementById("addSession");
const emptyAlert1 = $.getElementById("emptyAlert1");
const emptyAlert2 = $.getElementById("emptyAlert2");
const emptyAlert3 = $.getElementById("emptyAlert3");
const emptyAlert4 = $.getElementById("emptyAlert4");
const checkBox = $.getElementById("checkBox");
let isValid = null;

checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    sessionPrice.innerHTML = 0;
    sessionPrice.value = 0;
    sessionPrice.disabled = true;
  } else {
    sessionPrice.innerHTML = "";
    sessionPrice.value = "";
    sessionPrice.disabled = false;
  }
});

addSessionBtn.addEventListener("click", (event) => {
  if (!sessionName.value) {
    emptyAlert1.classList.remove("hidden");
    isValid = false;
  } else {
    emptyAlert1.classList.add("hidden");
    isValid = true;
  }
  if (!sessionCategory.value) {
    emptyAlert4.classList.remove("hidden");
    isValid = false;
  } else {
    emptyAlert4.classList.add("hidden");
    isValid = true;
  }
  if (!sessionDuration.value) {
    emptyAlert2.classList.remove("hidden");
    isValid = false;
  } else {
    emptyAlert2.classList.add("hidden");
    isValid = true;
  }
  if (!sessionPrice.value) {
    emptyAlert3.classList.remove("hidden");
    isValid = false;
  } else {
    emptyAlert3.classList.add("hidden");
    isValid = true;
  }

  if (isValid) {
    let newSession = {};
    fetch("http://localhost:3000/api/sessions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newSession),
    });
  }
});
