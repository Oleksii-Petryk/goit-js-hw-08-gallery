const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const galleryRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightBoxOverlayRef = document.querySelector('.lightbox__overlay');
const lightBoxImgRef = document.querySelector('.lightbox__image');
const lightBoxBtnCloseRef = document.querySelector('[data-action="close-lightbox"]');

const GalleryCollection = makeGalleryCollectionHtmlItem(galleryItems);

galleryRef.insertAdjacentHTML('beforeend', GalleryCollection);

function makeGalleryCollectionHtmlItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
          <li class="gallery__item">
            <a
              class="gallery__link"
              href="${original}"
              >
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt ="${description}"
              />
            </a>
          </li>`;
    })
    .join('');
};


galleryRef.addEventListener('click', onGalleryImgClick);


function onGalleryImgClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return
  };

  lightBoxRef.classList.add('is-open');
  lightBoxImgRef.alt = e.target.alt;
  lightBoxImgRef.src = e.target.dataset.source;
  lightBoxBtnCloseRef.addEventListener('click', onLightBoxBtnCloseClick);
  window.addEventListener('keydown', onEscKeyPress);
  lightBoxOverlayRef.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onSliderClick);
};


function onLightBoxBtnCloseClick(e) {
  lightBoxImgRef.src = '';
  lightBoxImgRef.alt = '';
  lightBoxRef.classList.remove('is-open');
  window.removeEventListener('keydown', onEscKeyPress);
  lightBoxOverlayRef.removeEventListener('click', onOverlayClick);
  window.removeEventListener('keydown', onSliderClick);
};


function onEscKeyPress(e) {
  const EscCode = 'Escape';
  const isEscCode = e.code === EscCode;
  if (isEscCode) {
    onLightBoxBtnCloseClick(e);
  };
};


function onOverlayClick(e) {
  if (e.currentTarget === e.target) {
    onLightBoxBtnCloseClick(e);
  };
};

function onSliderClick(e) {
  const ArrowRight = 'ArrowRight';
  const ArrowLeft = 'ArrowLeft';
  
  if (e.code === ArrowRight) {
    imgSrcChangePlus();
  };
    if (e.code === ArrowLeft) {
    imgSrcChangeMinus()
    };
  };



function imgSrcChangePlus() {
  const currentImg = galleryItems.map(elem => elem.original);
      for (let i = 0; i < currentImg.length; i += 1) {
      if (lightBoxImgRef.src === currentImg[i] && i < currentImg.length) {
        i += 1;

        lightBoxImgRef.src = currentImg[i];
        lightBoxImgRef.alt = currentImg[i];
      };
      if (i === currentImg.length) {

        lightBoxImgRef.src = currentImg[0];
        lightBoxImgRef.alt = currentImg[0];
      };
    };
};

function imgSrcChangeMinus() {
  const currentImg = galleryItems.map(elem => elem.original);
      for (let i = 0; i < currentImg.length; i += 1) {
      if (lightBoxImgRef.src === currentImg[i] && i < currentImg.length) {
        i -= 1;

        lightBoxImgRef.src = currentImg[i];
        lightBoxImgRef.alt = currentImg[i];
         console.log(currentImg[currentImg.length]);
      };
      if (lightBoxImgRef.src === currentImg[0]) {

        lightBoxImgRef.src = currentImg[(currentImg.length)];
        console.log(currentImg[(currentImg.length)]);
        lightBoxImgRef.alt = currentImg[(currentImg.length)];
      };
    };
};


