const $ = document;

const addNewCourseBtn = $.getElementById("addNewCourse");
const addCourseInModalBtn = $.getElementById("addCourseBtn");
const modalBg = $.getElementById("modalBg");
const addCourseModal = $.getElementById("addCourseModal");
const courseNameInput = $.getElementById("courseNameInput");
const courseNameAlert = $.getElementById("courseNameAlert");
const coursePriceInput = $.getElementById("coursePriceInput");
const coursePriceAlert = $.getElementById("coursePriceAlert");
const courseCategoryInput = $.getElementById("courseCategoryInput");
const courseCategoryAlert = $.getElementById("courseCategoryAlert");
const coursesWrapper = $.getElementById("coursesWrapper");
const usersSection = $.getElementById("usersSection");
const infosSectin = $.getElementById("infosSection");
const coursesSection = $.getElementById("coursesSection");
const sessionsSection = $.getElementById("sessionsSection");

const firstNameSide = $.getElementById("firstNameSide");
const lastNameSide = $.getElementById("lastNameSide");
const topName = $.getElementById("topName");
const topEmail = $.getElementById("topEmail");
const sideUserName = $.getElementById("sideUserName");
const sideEmail = $.getElementById("sideEmail");

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
    });
};

window.addEventListener("load", getMainAdmin);

let isValid = null;

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

window.addEventListener("load", () => {
  let adminId = localStorage.getItem("loginId");
  if (!adminId) {
    location.href = "http://127.0.0.1:5500/crazyFront/login.html";
  }
});
const getAllCourses = () => {
  coursesWrapper.innerHTML = "";
  fetch("http://localhost:3000/api/courses/", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((course) => {
        coursesWrapper.insertAdjacentHTML(
          "afterbegin",
          `<div class="flex rounded-xl shadow shadow-slate-500">
      <div class="w-1/3 rounded-s-xl">
        <img
          class="w-full rounded-s-xl"
          src="./src/img/course/course.png"
          alt="course"
        />
      </div>
      <div
        class="flex w-2/3 flex-col items-stretch justify-between rounded-e-xl"
      >
        <div class="flex flex-col gap-3 px-5 pt-2">
          <p class="cursor-pointer text-xl font-bold text-amber-600">
            ${course.title}
          </p>
          <p class="text-slate-500">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه
            روزنامه و مجله در ستون و سطرآنچنان که لازم است
          </p>
        </div>
        <div
          class="flex items-center justify-between rounded-bl-xl bg-slate-100 px-5 py-2 text-blue-500"
        >
          <div class="flex items-center justify-center gap-10">
            <div class="flex items-center justify-center gap-3">
              <i class="fas fa-coins"></i>
              <p>${course.price}</p>
            </div>
            <div class="flex items-center justify-center gap-3">
              <i class="fa fa-folder" aria-hidden="true"></i>
              <p>${course.category}</p>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div class="flex items-center justify-center gap-3">
              <i class="fa fa-users" aria-hidden="true"></i>
              <p>500</p>
            </div>
          </div>
        </div>
      </div>
    </div>`,
        );
      });
    });
};
addNewCourseBtn.addEventListener("click", () => {
  modalBg.classList.remove("hidden");
  addCourseModal.classList.remove("hidden");
  addCourseModal.classList.add("flex");
});

const closeModal = () => {
  addCourseModal.classList.remove("flex");
  modalBg.classList.add("hidden");
  addCourseModal.classList.add("hidden");
};
modalBg.addEventListener("click", closeModal);
const validation = () => {
  if (!courseNameInput.value) {
    courseNameAlert.classList.remove("hidden");
    isValid = false;
  } else {
    isValid = true;
    courseNameAlert.classList.add("hidden");
  }
  if (!coursePriceInput.value) {
    coursePriceAlert.classList.remove("hidden");
    isValid = false;
  } else {
    isValid = true;
    coursePriceAlert.classList.add("hidden");
  }
  if (!courseCategoryInput.value) {
    courseCategoryAlert.classList.remove("hidden");
    isValid = false;
  } else {
    isValid = true;
    courseCategoryAlert.classList.add("hidden");
  }
};
addCourseInModalBtn.addEventListener("click", () => {
  validation();

  let newCourse = {
    title: courseNameInput.value,
    // body: "",
    // time: "",
    price: coursePriceInput.value,
    // students: "",
    category: courseCategoryInput.value,
    // cover: "",
  };
  fetch("http://localhost:3000/api/courses", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newCourse),
  }).then((res) => {
    console.log(res);
    closeModal();
    getAllCourses();
  });
});

window.addEventListener("load", getAllCourses);
