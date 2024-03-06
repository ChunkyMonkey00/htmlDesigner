document.addEventListener('DOMContentLoaded', function () {
  // Toggle side navigation
  document.addEventListener('keydown', function (event) {
    if (event.key === 'q' || event.key === 'Q') {
      document.getElementById('side-nav').classList.toggle('open');
    }
  });

  // Drag and drop functionality
  let draggableItems = document.querySelectorAll('.draggable');
  let dropArea = document.getElementById('drop-area');

  draggableItems.forEach(item => {
    item.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text/plain', event.target.textContent);
    });
  });

  dropArea.addEventListener('dragover', function (event) {
    event.preventDefault(); // Necessary to allow dropping
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.getElementById('position-dropdown');
  const dropdownContent = dropdown.querySelector('.dropdown-content');
  let positionType = 'scale'; // Default position type

  // Toggle dropdown content
  dropdown.querySelector('.dropbtn').addEventListener('click', function () {
    dropdownContent.classList.toggle('show');
  });

  // Close dropdown content when clicking outside
  window.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
      dropdownContent.classList.remove('show');
    }
  });

  // Handle dropdown option selection
  dropdownContent.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      positionType = e.target.getAttribute('data-value');
      dropdownContent.classList.remove('show');
    }
  });

  // Drag and drop functionality
  let draggableItems = document.querySelectorAll('.draggable');
  let dropArea = document.getElementById('drop-area');

  draggableItems.forEach(item => {
    item.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text/plain', event.target.textContent);
    });
  });

  dropArea.addEventListener('dragover', function (event) {
    event.preventDefault(); // Necessary to allow dropping
  });

  dropArea.addEventListener('drop', function (event) {
    event.preventDefault();
    let elementType = event.dataTransfer.getData('text/plain');
    let newElement;

    switch (elementType) {
      case 'Div':
        newElement = document.createElement('div');
        newElement.style.border = '1px solid #000';
        break;
      case 'Button':
        newElement = document.createElement('button');
        newElement.textContent = 'Button';
        break;
      case 'Link':
        newElement = document.createElement('a');
        newElement.href = '#';
        newElement.textContent = 'Link';
        break;
    }

    if (newElement) {
      // Calculate the position as a percentage of the drop area's size
      let rect = dropArea.getBoundingClientRect();
      let x = event.clientX; // x position within the element.
      let y = event.clientY; // y position within the element.
      let width = window.innerWidth;
      let height = window.innerHeight;

      let leftPercentage = (x / width) * 100;
      let topPercentage = (y / height) * 100;

      // Position the element using percentages
      if (positionType === 'scale') {
        newElement.style.position = 'absolute';
        newElement.style.left = `${leftPercentage}%`;
        newElement.style.top = `${topPercentage}%`;
      } else {
        // For 'absolute', use the previously implemented logic
        newElement.style.position = 'absolute';
        newElement.style.left = `${event.clientX}px`;
        newElement.style.top = `${event.clientY}px`;
      }
      dropArea.appendChild(newElement);
    }
  });
});
