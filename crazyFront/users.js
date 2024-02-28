const $ = document;
const usersWrapper = $.getElementById("usersWrapper");
const firstNameSide = $.getElementById("firstNameSide");
const lastNameSide = $.getElementById("lastNameSide");
const modal = $.getElementById("removeModal");
const modalBg = $.getElementById("modalBg");
const yesBtn = $.getElementById("yesBtn");
const noBtn = $.getElementById("noBtn");

let mainUser = null;
const getAllUsers = () => {
  fetch("http://localhost:3000/api/users/", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      usersWrapper.innerHTML = "";
      data.forEach((user) => {
        usersWrapper.insertAdjacentHTML(
          "afterbegin",
          `<div
              class="flex items-center justify-between rounded-xl border-2 p-5"
            >
              <div class="flex items-center justify-center gap-5">
                <div class="w-16 rounded-md">
                  <img
                    class="w-full rounded-md"
                    src="${user.profile}"
                    alt="profile"
                  />
                </div>
                <div>
                  <div class="flex items-center justify-center gap-5">
                    <p class="text-xl font-bold">${user.userName}</p>
                    <p class="rounded-xl bg-sky-700 px-2 py-1 text-white">
                      ${user.created_AT}
                    </p>
                  </div>
                  <p class="text-slate-400">${user.firstName} ${user.lastName}</p>
                </div>
              </div>
              <div class="flex items-center justify-center gap-5">
                <button
                  class="flex items-center justify-center rounded-xl bg-sky-400 px-4 py-2 text-xl text-white shadow-md shadow-sky-700 transition duration-300 ease-in-out hover:bg-sky-600"
                >
                  ویرایش
                </button>
                <button onclick="showModal('${user._id}')" 
                  class="flex items-center justify-center rounded-xl bg-red-400 px-4 py-2 text-xl text-white shadow-md shadow-red-700 transition duration-300 ease-in-out hover:bg-red-600"
                >
                  حذف
                </button>
              </div>
            </div>`,
        );
      });
    });
};
window.addEventListener("load", getAllUsers);

const showModal = (userID) => {
  mainUser = userID;
  modalBg.classList.remove("hidden");
  modal.classList.remove("-top-56");
  modal.classList.add("top-1/2");
};
const closeModal = () => {
  modal.classList.remove("top-1/2");
  modalBg.classList.add("hidden");
  modal.classList.add("-top-56");
};
noBtn.addEventListener("click", () => {
  closeModal();
});
yesBtn.addEventListener("click", () => {
  fetch(`http://localhost:3000/api/users/${mainUser}`, {
    method: "DELETE",
  }).then((res) => {
    closeModal();
    getAllUsers();
  });
});
