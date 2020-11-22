import imgList from "./img.js";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
let imgIndex = 0;

const card = imgList.map(({ preview, original, description }, index) => {
  return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" data-index="${index}" alt="${description}"></a></li>`;
});
gallery.insertAdjacentHTML("beforeend", card.join(""));

gallery.addEventListener("click", onGalleryClick);
lightbox.addEventListener("click", closeModalClick);

function onGalleryClick(e) {
  e.preventDefault();
  imgIndex = Number(e.target.getAttribute("data-index"));
  if (e.target.nodeName !== "IMG") return;
  lightbox.classList.add("is-open");
  modalImg.src = e.target.dataset.source;
  modalImg.alt = e.target.dataset.alt;

  window.addEventListener("keydown", onEscapeTap);
  window.addEventListener("keydown", modalNav);
}
function closeModalClick(e) {
  if (e.target.nodeName === "IMG") return;
  lightbox.classList.remove("is-open");
  modalImg.src = "";
  modalImg.alt = "";
}
function onEscapeTap(e) {
  if (e.code === "Escape" && lightbox.classList.contains("is-open")) {
    closeModalClick(e);
  }
}

function modalNav(e) {
  const left = "ArrowLeft";
  const right = "ArrowRight";
  switch (e.code) {
    case left:
      imgIndex -= 1;
      break;
    case right:
      imgIndex += 1;
      break;
  }
  if (imgIndex > imgList.length - 1) imgIndex = 0;
  if (imgIndex < 0) imgIndex = imgList.length - 1;
  modalImg.src = imgList[imgIndex].original;
}
