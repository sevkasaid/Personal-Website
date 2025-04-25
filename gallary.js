document.getElementById("year").textContent = new Date().getFullYear();

fetch('./json/gallary.json')
    .then(response => response.json())
    .then(data => {
      const galleryGrid = document.getElementById('galleryGrid');

      data.gallery.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        galleryItem.innerHTML = `
          <img src="${item.thumb}" alt="${item.caption}" data-full="${item.full}">
          <p class="caption">${item.caption}</p>
        `;

        galleryGrid.appendChild(galleryItem);
      });

      // Lightbox logic
      document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
          const lightbox = document.createElement('div');
          lightbox.classList.add('lightbox');

          lightbox.innerHTML = `
            <div class="lightbox-content">
              <button class="close-btn">&times;</button>
              <img src="${img.getAttribute('data-full')}" alt="Full Image">
            </div>
          `;

          document.body.appendChild(lightbox);

          // Close button
          lightbox.querySelector('.close-btn').addEventListener('click', () => {
            lightbox.remove();
          });

          // Close on outside click
          lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.remove();
          });
        });
      });
    })
    .catch(error => console.error('Error loading gallery:', error));