import "./index.css";
import {
  resetValidation,
  settings,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setButtontext } from "../utils/helpers.js";
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

api
  .getAppInfo()
  .then(([userData, cards]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.prepend(cardElement);
    });
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarImage.src = userData.avatar;
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
  });

const avatarProfileClosedBtn = document.querySelector(
  ".profile__avatar-close-btn"
);


// profile form elements
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

//  delete   form  elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".delete__form");
const deleteModalClose = deleteModal.querySelector(".modal__close-btn");
const deleteModalCancelBtn = deleteModal.querySelector(".modal__button_cancel");

// card form elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardForm.querySelector(".modal__submit-btn");
const cardModalClosedBtn = cardModal.querySelector(".modal__close-btn");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
console.log(cardModal);
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

// avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarImage = document.querySelector(".profile__avatar-btn");
const avatarForm = avatarModal.querySelector("#modal_form");
const avatarSubmitBtn = avatarForm.querySelector(".modal__submit-btn");
const avatarModalClosedBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

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
  cardDeleteBtn.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
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

function handleLike(evt, id) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-btn_active");
  api
    .changeLikeCardStatus(id, !isLiked)
    .then((updatedCard) => {
      // Update the UI accordingly
      likeButton.classList.toggle("card__like-btn_active", !isLiked);
      const likeCounter = likeButton
        .closest(".card")
        .querySelector(".card__like-count");
      if (likeCounter) {
        likeCounter.textContent = updatedCard.likes.length;
      }
    })
    .catch((err) => {
      console.error("Error updating like status:", err);
    });
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
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  setButtontext(submitBtn, false, "Saving...");
  evt.preventDefault();
  api
    .editUserInfo({ name: editModalNameInput.value, about: editDescriptionInput.value, })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
     const submitBtn = evt.submitter;
      setButtontext(submitBtn,false);
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

let selectedCard, selectedCardId;

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  api.addCard(inputValues).then((res) => {
    console.log(res);
    const cardEl = getCardElement(res);
    cardsList.prepend(cardEl);
    cardForm.reset();
    disableButton(cardSubmitBtn,settings);
    closeModal(cardModal);
  });
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarInfo({ avatar: avatarInput.value })
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

avatarSubmitBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

deleteModalCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalClose.addEventListener("click", () => {
  closeModal(deleteModal);
});

avatarImage.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteCardSubmit);

avatarModalClosedBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});
