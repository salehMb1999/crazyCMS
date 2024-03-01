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

let isValid = null;

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
  });
});
