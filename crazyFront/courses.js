const $ = document;

const addNewCourseBtn = $.getElementById("addNewCourse");
const addCourseInModalBtn = $.getElementById("addCourseBtn");
const modalBg = $.getElementById("modalBg");
const addCourseModal = $.getElementById("addCourseModal");

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
