import "./index.css";
import { enableValidation, validationConfig } from "../scripts/validation.js";
import Api from "../utils/Api.js";
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "A bridge over the water",
    link: "  https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "273bfa6a-d4bd-41dc-8c86-3b8ffeccf837",
    "Content-Type": "application/json",
  },
});

api.getAppInfo().then(([cards]) => {
  cards.forEach((item) => {
    const cardElement = getCardElement([item]);
    cardsList.prepend(cardElement);
  });
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  avatarImage.src = userData.avatar;
});


const avatarProfileClosedBtn  = document.querySelector(".profile__avatar-close-btn");
const avatarModalBtn = document.querySelector('.profile__avatar-btn');
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editProfileClosedBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardForm.querySelector(".modal__submit-btn");
const cardModalClosedBtn = cardModal.querySelector(".modal__close-btn");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

// avatar form elements
const avatarModal = document.querySelector("#add-avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarForm.querySelector(".modal__submit-btn");
const avatarModalClosedBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#add-card-avatar-input");

const previewModal = document.querySelector("#preview");
const previewModalImageEL = previewModal.querySelector(".modal__image");
const previewModalCaptionEL = previewModal.querySelector(".modal__caption");
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEL = cardElement.querySelector(".card__title");
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardNameEL.textContent = data.name;
  cardImageEL.src = data.link;
  cardImageEL.alt = data.name;
  cardImageEL.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaptionEL.textContent = data.name;
    previewModalImageEL.src = data.link;
    previewModalImageEL.alt = data.name;
  });
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}
cardModalClosedBtn.addEventListener("click", () => {
  closeModal(cardModal);
});
const previewModalClosedBtn = previewModal.querySelector(".modal__close-btn");
previewModalClosedBtn.addEventListener("click", () => {
  closeModal(previewModal);
});
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) =>
  modal.addEventListener("mousedown", handleOverlayClick)
);
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  api.editUserInfo({name:  name.Input.vaule, about: description.Input.vaule})
  .then((data) => {
  
   profileNameElement.textContent = data.name;
   profileDescriptionElement.textContent = data.about;
   closeModal(editModal);
  })
  .catch((err) => {
    console.error(err);
  }
  );
 
}
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardEl = getCardElement(inputValues);
  cardsList.prepend(cardEl);
  cardForm.reset();
  disableButton(cardSubmitBtn, settings);
  closeModal(cardModal);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api.editAvatar({ avatar: avatarInput.value })
    .then((data) => {
      avatarImage.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error(err);
    });
}



profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, settings);
  openModal(editModal);
});
editProfileClosedBtn.addEventListener("click", () => {
  closeModal(editModal);
});
cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});
editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);


avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);



avatarProfileClosedBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});