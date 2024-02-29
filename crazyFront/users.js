const $ = document;
const usersWrapper = $.getElementById("usersWrapper");
const firstNameSide = $.getElementById("firstNameSide");
const lastNameSide = $.getElementById("lastNameSide");
const modal = $.getElementById("removeModal");
const editModal = $.getElementById("editModal");
const modalBg = $.getElementById("modalBg");
const yesBtn = $.getElementById("yesBtn");
const noBtn = $.getElementById("noBtn");
const firstNameInput = $.getElementById("firstNameInput");
const secondNameInput = $.getElementById("secondNameInput");
const userNameInput = $.getElementById("userNameInput");
const editUserBtn = $.getElementById("editUserBtn");
const firstNameAlert = $.getElementById("firstNameAlert");
const secondNameAlert = $.getElementById("secondNameAlert");
const userNameAlert = $.getElementById("userNameAlert");
let firstNameValid,
  secondNameValid,
  userNameValid = null;
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
                <button onclick="showEditModal('${user._id}')"
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
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};
const showEditModal = (userID) => {
  mainUser = userID;
  modalBg.classList.remove("hidden");
  editModal.classList.remove("hidden");
  editModal.classList.add("flex");
};
const closeModal = () => {
  modal.classList.remove("flex");
  editModal.classList.remove("flex");
  modalBg.classList.add("hidden");
  editModal.classList.add("hidden");
  modal.classList.add("hidden");
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

editUserBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (firstNameValid && secondNameValid && userNameValid) {
    let userNewDatas = {
      firstName: firstNameInput.value,
      lastName: secondNameInput.value,
      userName: userNameInput.value,
      profile: "./src/img/profile/5.jpg",
    };
    fetch(`http://localhost:3000/api/users/${mainUser}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userNewDatas),
    }).then((res) => {
      console.log(res);
      closeModal();
      getAllUsers();
    });
  } else {
    alert("اطلاعات به درستی وارد نشده اند!!");
  }
});
