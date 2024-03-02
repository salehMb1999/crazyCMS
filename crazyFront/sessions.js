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
const sessionsWrapper = $.getElementById("sessionsWrapper");
const usersSection = $.getElementById("usersSection");
const infosSectin = $.getElementById("infosSection");
const coursesSection = $.getElementById("coursesSection");
const sessionsSection = $.getElementById("sessionsSection");
usersSection.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/crazyFront/panel-users.html";
});
infosSectin.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/crazyFront/panel-change-info.html";
});
coursesSection.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/crazyFront/panel-courses.html";
});

sessionsSection.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/crazyFront/panel-sessions.html";
});

let isValid = null;
let isFree = null;
window.addEventListener("load", () => {
  let adminId = localStorage.getItem("loginId");
  if (!adminId) {
    location.href = "http://127.0.0.1:5500/crazyFront/login.html";
  }
});
checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    sessionPrice.innerHTML = 0;
    sessionPrice.value = 0;
    sessionPrice.disabled = true;
    isFree = true;
  } else {
    sessionPrice.innerHTML = "";
    sessionPrice.value = "";
    sessionPrice.disabled = false;
    isFree = false;
  }
});
const cleaner = () => {
  sessionName.value = "";
  sessionDuration.value = "";
  sessionPrice.value = "";
  sessionCategory.value = "";
};
const getAllSessions = () => {
  fetch("http://localhost:3000/api/sessions/", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((sessions) => {
      sessionsWrapper.innerHTML = "";
      sessions.forEach((session) => {
        hour = Math.floor(session.time / 60);
        min = session.time % 60;
        console.log(session.time);
        sessionsWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="flex justify-between rounded-xl border-2 p-5">
                      <div class="flex items-center justify-center gap-7">
                        <p class="text-lg font-bold"> ${session.title} </p>
                        <p class="text-sm">${session.course}</p>
                      </div>
                      <div class="flex items-center justify-center gap-7">
                        <p class="rounded-lg bg-red-600 px-3 py-1 text-white">
                          ${session.price}
                        </p>
                        <p><span>${hour}</span>hr <span>${min}</span>min</p>
                      </div>
                    </div>`,
        );
      });
    });
};
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
    let newSession = {
      title: sessionName.value,
      time: sessionDuration.value,
      price: sessionPrice.value,
      course: sessionCategory.value,
    };
    fetch("http://localhost:3000/api/sessions/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newSession),
    }).then((res) => {
      console.log(res);
      cleaner();
    });
  } else {
    alert("اطلاعات به درستی وارد نشده اند!!");
  }
});
let hour = null;
let min = null;

window.addEventListener("load", getAllSessions());
