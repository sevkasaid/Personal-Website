document.getElementById("year").textContent = new Date().getFullYear();

fetch('./json/images.json')    
    .then(response => response.json())
    .then(data => {
      const galleryCarousel = document.querySelector('.carousel-inner');

      data.images.forEach((image, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
          carouselItem.classList.add('active');  
        }

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.classList.add('d-block', 'w-100', 'rounded');

        const caption = document.createElement('div');
        caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
        caption.innerHTML = `<p>${image.description}</p>`;

        carouselItem.appendChild(img);
        carouselItem.appendChild(caption);

        galleryCarousel.appendChild(carouselItem);
      });
    })
    .catch(error => console.log('Error loading the JSON data:', error));  
