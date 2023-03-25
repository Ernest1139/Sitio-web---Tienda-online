const slider = document.querySelector('.slider');

// Clonar las imágenes para crear un efecto infinito
const firstImg = slider.firstElementChild.cloneNode(true);
const secondImg = slider.firstElementChild.nextElementSibling.cloneNode(true);
const lastImg = slider.lastElementChild.cloneNode(true);

slider.appendChild(firstImg);
slider.insertBefore(lastImg, slider.firstElementChild);

// Ajustar el ancho del slider después de clonar las imágenes
const sliderWidth = slider.childElementCount * 25;
slider.style.width = `${sliderWidth}%`;