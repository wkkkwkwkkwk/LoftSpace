

// ===================== ОБЩИЕ НАСТРОЙКИ =====================
    const totalSlides = 3; // Общее количество слайдов
    let currentSlide = 1;  // Текущий слайд (1, 2, 3...)

    // ===================== ЭЛЕМЕНТЫ =====================
    // Изображение
    const sliderImg = document.getElementById('container__slider_bac');
    
    // Кастомный слайдер
    const track = document.getElementById('track');
    const thumb = document.getElementById('thumb');
    const progress = document.getElementById('progress');
    const currentDisplay = document.getElementById('current');
    const totalDisplay = document.getElementById('total');
    
    // Стрелки
    const prevBtn = document.getElementById('strelka__slider__1');
    const nextBtn = document.getElementById('strelka__slider__2');

    // ===================== ФУНКЦИИ =====================
    
    // Обновление визуального слайдера и изображения
    function updateSlider(value) {
      // Ограничиваем значение
      currentSlide = Math.max(1, Math.min(totalSlides, value));
      
      // Вычисляем процент для прогресс-бара
      const percentage = ((currentSlide - 1) / (totalSlides - 1)) * 90 + 12;
      
      // Обновляем кастомный слайдер
      thumb.style.left = percentage + '%';
  
      progress.style.width = percentage + '%' ;
      currentDisplay.textContent = String(currentSlide).padStart(2, '0');
      
      // Обновляем изображение
      if (sliderImg) {
        sliderImg.src = 'img/imgSlider' + currentSlide + '.jpg';
        sliderImg.alt = 'Слайд ' + currentSlide;
      }
      
    }

    // Получение позиции из события (мышь или тач)
    function getPositionFromEvent(e) {
      const rect = track.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const position = (clientX - rect.left) / rect.width;
      return Math.round(position * (totalSlides - 1)) + 1;
    }

    // ===================== ОБРАБОТЧИКИ СТРЕЛОК =====================
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentSlide > 1) {
          updateSlider(currentSlide - 1);
        }else{
            
          updateSlider(3);
        
        }
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides) {
          updateSlider(currentSlide + 1);
        }else{
          updateSlider(1);
        }
      });
    }

    // ===================== ОБРАБОТЧИКИ КАСТОМНОГО СЛАЙДЕРА =====================
    
    let isDragging = false;

    // Мышь
    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(getPositionFromEvent(e));
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        updateSlider(getPositionFromEvent(e));
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Тач-устройства
    track.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSlider(getPositionFromEvent(e));
    });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        updateSlider(getPositionFromEvent(e));
      }
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

    // ===================== ИНИЦИАЛИЗАЦИЯ =====================
    totalDisplay.textContent = String(totalSlides).padStart(2, '0');
    updateSlider(1); // Устанавливаем первый слайд







// ===================== DRAG СЛАЙДЕР (исправлено) =====================
const wrapper2 = document.getElementById('sliderWrapper');
const track2 = document.getElementById('sliderTrack');

// Проверяем, что элементы существуют
if (!wrapper2 || !track2) {
  console.log('Элементы слайдера не найдены');
} else {
  let isDragging2 = false;
  let startX2 = 0;
  let scrollLeft2 = 0;

  // При нажатии мыши
  wrapper2.addEventListener('mousedown', (e) => {
    isDragging2 = true;
    track2.classList.add('dragging');
    startX2 = e.pageX - wrapper2.offsetLeft;
    scrollLeft2 = wrapper2.scrollLeft;
    e.preventDefault(); // Предотвращаем выделение
  });

  // При движении мыши
  document.addEventListener('mousemove', (e) => {
    if (!isDragging2) return;
    
    const x2 = e.pageX - wrapper2.offsetLeft;
    const walk2 = (x2 - startX2) * 2; // Увеличил скорость для отзывчивости
    
    wrapper2.scrollLeft = scrollLeft2 - walk2;
  });

  // При отпускании мыши
  document.addEventListener('mouseup', () => {
    isDragging2 = false;
    track2.classList.remove('dragging');
  });

  // При выходе мыши за пределы
  wrapper2.addEventListener('mouseleave', () => {
    isDragging2 = false;
    track2.classList.remove('dragging');
  });

  // Тач-устройства
  wrapper2.addEventListener('touchstart', (e) => {
    isDragging2 = true;
    startX2 = e.touches[0].pageX - wrapper2.offsetLeft;
    scrollLeft2 = wrapper2.scrollLeft;
  });

  wrapper2.addEventListener('touchmove', (e) => {
    if (!isDragging2) return;
    
    const x2 = e.touches[0].pageX - wrapper2.offsetLeft;
    const walk2 = (x2 - startX2) * 2;
    
    wrapper2.scrollLeft = scrollLeft2 - walk2;
  });

  wrapper2.addEventListener('touchend', () => {
    isDragging2 = false;
  });
}




// ===================== PHOTO GALLERY SLIDER =====================
const photoWrapper = document.getElementById('photoGalleryWrapper');
const photoTrack = document.getElementById('photoGalleryTrack');

if (photoWrapper && photoTrack) {
  let isPhotoDragging = false;
  let photoStartX = 0;
  let photoScrollLeft = 0;

  // Mouse events
  photoWrapper.addEventListener('mousedown', (e) => {
    isPhotoDragging = true;
    photoTrack.classList.add('dragging');
    photoStartX = e.pageX - photoWrapper.offsetLeft;
    photoScrollLeft = photoWrapper.scrollLeft;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isPhotoDragging) return;
    
    const x = e.pageX - photoWrapper.offsetLeft;
    const walk = (x - photoStartX) * 2;
    photoWrapper.scrollLeft = photoScrollLeft - walk;
  });

  document.addEventListener('mouseup', () => {
    isPhotoDragging = false;
    photoTrack.classList.remove('dragging');
  });

  photoWrapper.addEventListener('mouseleave', () => {
    isPhotoDragging = false;
    photoTrack.classList.remove('dragging');
  });

  // Touch events
  photoWrapper.addEventListener('touchstart', (e) => {
    isPhotoDragging = true;
    photoStartX = e.touches[0].pageX - photoWrapper.offsetLeft;
    photoScrollLeft = photoWrapper.scrollLeft;
  });

  photoWrapper.addEventListener('touchmove', (e) => {
    if (!isPhotoDragging) return;
    
    const x = e.touches[0].pageX - photoWrapper.offsetLeft;
    const walk = (x - photoStartX) * 2;
    photoWrapper.scrollLeft = photoScrollLeft - walk;
  });

  photoWrapper.addEventListener('touchend', () => {
    isPhotoDragging = false;
  });
}



// ===================== NEWS SLIDER =====================
const newsSliderWrapper = document.getElementById('newsSliderWrapper');
const newsSliderTrack = document.getElementById('newsSliderTrack');

if (newsSliderWrapper && newsSliderTrack) {
  let isNewsDragging = false;
  let newsStartX = 0;
  let newsScrollLeft = 0;

  // Mouse events
  newsSliderWrapper.addEventListener('mousedown', (e) => {
    isNewsDragging = true;
    newsSliderTrack.classList.add('dragging');
    newsStartX = e.pageX - newsSliderWrapper.offsetLeft;
    newsScrollLeft = newsSliderWrapper.scrollLeft;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isNewsDragging) return;
    
    const x = e.pageX - newsSliderWrapper.offsetLeft;
    const walk = (x - newsStartX) * 2;
    newsSliderWrapper.scrollLeft = newsScrollLeft - walk;
  });

  document.addEventListener('mouseup', () => {
    isNewsDragging = false;
    newsSliderTrack.classList.remove('dragging');
  });

  newsSliderWrapper.addEventListener('mouseleave', () => {
    isNewsDragging = false;
    newsSliderTrack.classList.remove('dragging');
  });

  // Touch events
  newsSliderWrapper.addEventListener('touchstart', (e) => {
    isNewsDragging = true;
    newsStartX = e.touches[0].pageX - newsSliderWrapper.offsetLeft;
    newsScrollLeft = newsSliderWrapper.scrollLeft;
  });

  newsSliderWrapper.addEventListener('touchmove', (e) => {
    if (!isNewsDragging) return;
    
    const x = e.touches[0].pageX - newsSliderWrapper.offsetLeft;
    const walk = (x - newsStartX) * 2;
    newsSliderWrapper.scrollLeft = newsScrollLeft - walk;
  });

  newsSliderWrapper.addEventListener('touchend', () => {
    isNewsDragging = false;
  });
}



// ===================== LOFT CARDS SLIDER (≤720px) =====================
const loftCardsSliderWrapper = document.getElementById('loftCardsSliderWrapper');
const loftCardsSliderTrack = document.getElementById('loftCardsSliderTrack');

if (loftCardsSliderWrapper && loftCardsSliderTrack) {
  let isLoftCardsDragging = false;
  let loftCardsStartX = 0;
  let loftCardsScrollLeft = 0;

  // Mouse events
  loftCardsSliderWrapper.addEventListener('mousedown', (e) => {
    isLoftCardsDragging = true;
    loftCardsSliderTrack.classList.add('dragging');
    loftCardsStartX = e.pageX - loftCardsSliderWrapper.offsetLeft;
    loftCardsScrollLeft = loftCardsSliderWrapper.scrollLeft;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isLoftCardsDragging) return;
    
    const x = e.pageX - loftCardsSliderWrapper.offsetLeft;
    const walk = (x - loftCardsStartX) * 2;
    loftCardsSliderWrapper.scrollLeft = loftCardsScrollLeft - walk;
  });

  document.addEventListener('mouseup', () => {
    isLoftCardsDragging = false;
    loftCardsSliderTrack.classList.remove('dragging');
  });

  loftCardsSliderWrapper.addEventListener('mouseleave', () => {
    isLoftCardsDragging = false;
    loftCardsSliderTrack.classList.remove('dragging');
  });

  // Touch events
  loftCardsSliderWrapper.addEventListener('touchstart', (e) => {
    isLoftCardsDragging = true;
    loftCardsStartX = e.touches[0].pageX - loftCardsSliderWrapper.offsetLeft;
    loftCardsScrollLeft = loftCardsSliderWrapper.scrollLeft;
  });

  loftCardsSliderWrapper.addEventListener('touchmove', (e) => {
    if (!isLoftCardsDragging) return;
    
    const x = e.touches[0].pageX - loftCardsSliderWrapper.offsetLeft;
    const walk = (x - loftCardsStartX) * 2;
    loftCardsSliderWrapper.scrollLeft = loftCardsScrollLeft - walk;
  });

  loftCardsSliderWrapper.addEventListener('touchend', () => {
    isLoftCardsDragging = false;
  });
}



const openModalBtn = document.getElementById('openModalBtn');
    const modalForm = document.getElementById('modalForm');
    const modalSuccess = document.getElementById('modalSuccess');
    const closeFormModal = document.getElementById('closeFormModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const requestForm = document.getElementById('requestForm');

    console.log('✅ Кнопка:', openModalBtn);
    console.log('✅ Модалка 1:', modalForm);
    console.log('✅ Модалка 2:', modalSuccess);

    // Открытие
    openModalBtn.addEventListener('click', () => {
      console.log('🔔 Клик по кнопке!');
      modalForm.classList.add('active');
    });

    // Закрытие
    closeFormModal.addEventListener('click', () => {
      modalForm.classList.remove('active');
    });

    closeSuccessModal.addEventListener('click', () => {
      modalSuccess.classList.remove('active');
    });

    // Отправка формы
    requestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userName').value;
      const phone = document.getElementById('userPhone').value;
      const consent = document.getElementById('userConsent').checked;

      console.log('📝 Форма:', { name, phone, consent });

      if (name && phone && consent) {
        modalForm.classList.remove('active');
        setTimeout(() => {
          modalSuccess.classList.add('active');
        }, 300);
      } else {
        alert('Заполните все поля и поставьте галочку!');
      }
    });