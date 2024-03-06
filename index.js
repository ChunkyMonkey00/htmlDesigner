document.addEventListener('DOMContentLoaded', function () {
  // Toggle side navigation
  document.addEventListener('keydown', function (event) {
    if (event.key === 'q' || event.key === 'Q') {
      document.getElementById('side-nav').classList.toggle('open');
    }
    if (event.key === " ") {
      // Step 1: Get the HTML content
      let htmlContent = document.getElementById('drop-area').innerHTML;

      // Step 2: Parse the HTML content into a DOM object
      let parser = new DOMParser();
      let doc = parser.parseFromString(htmlContent, 'text/html');

      // Step 3: Traverse the DOM object to find all elements
      // Step 4: For each element, check if it has the draggable attribute
      // Step 5: If it does, remove the attribute
      let elements = doc.querySelectorAll('*');
      elements.forEach(element => {
        if (element.hasAttribute('draggable')) {
          element.removeAttribute('draggable');
        }
      });

      // Step 6: Serialize the modified DOM back into an HTML string
      let modifiedHtmlContent = doc.documentElement.innerHTML;

      // Log the modified HTML string to the console
      console.log(modifiedHtmlContent);
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
  let lastClickedElement = null;
  let createdElements = [];

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
      case 'P':
        newElement = document.createElement('p');
        newElement.textContent = 'Paragraph';
        break;
    }

    if (newElement) {
      newElement.style.border = "1px dashed black";
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
      /* experimental
      newElement.addEventListener('click', function () {
        showCircles(newElement);
      });
      */

      // Add the new element to the list of created elements
      createdElements.push(newElement);

      newElement.addEventListener('click', function (e) {
        lastClickedElement = this;
      });

      /* make draggable */
      newElement.setAttribute('draggable', true);

      // Add drag event listeners to the new element
      newElement.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', event.target.id);
      });

      newElement.addEventListener('dragover', function (event) {
        event.preventDefault(); // Necessary to allow dropping
      });

      newElement.addEventListener('dragend', function (event) {
        event.preventDefault();
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
      });

      // Assign a unique ID to the new element for drag purposes
      newElement.id = `element-${createdElements.length}`;

      dropArea.appendChild(newElement);
    }
  });

  function showCircles(element) {
    // Remove existing circles if any
    const existingCircles = document.querySelectorAll('.corner-circle');
    existingCircles.forEach(circle => circle.remove());

    // Create four circles
    for (let i = 0; i < 4; i++) {
      let circle = document.createElement('div');
      circle.className = 'corner-circle';
      circle.draggable = true;
      circle.style.width = '10px';
      circle.style.height = '10px';
      circle.style.borderRadius = '50%';
      circle.style.backgroundColor = 'red';
      circle.style.position = 'absolute';

      // Position the circles at the corners
      switch (i) {
        case 0: // Top left
          circle.style.top = '-5px';
          circle.style.left = '-5px';
          break;
        case 1: // Top right
          circle.style.top = '-5px';
          circle.style.right = '-5px';
          break;
        case 2: // Bottom left
          circle.style.bottom = '-5px';
          circle.style.left = '-5px';
          break;
        case 3: // Bottom right
          circle.style.bottom = '-5px';
          circle.style.right = '-5px';
          break;
      }
      circle.addEventListener('dragstart', handleCircleDragStart);
      circle.addEventListener('drag', handleCircleDrag);
      circle.addEventListener('dragend', handleCircleDragEnd);

      element.appendChild(circle);
    }
  }

  let draggedCircle = null;
  let originalSize = null;

  function handleCircleDragStart(event) {
    draggedCircle = event.target;
    originalSize = {
      width: draggedCircle.parentElement.offsetWidth,
      height: draggedCircle.parentElement.offsetHeight
    };
  }

  function handleCircleDrag(event) {
    if (!draggedCircle) return;
    // Calculate the new dimensions based on the drag direction and distance
    // This part requires custom logic based on which circle is being dragged
    // and the direction of the drag.
    // For simplicity, let's assume we're dragging the bottom right circle to resize.
    let newWidth = originalSize.width + event.movementX;
    let newHeight = originalSize.height + event.movementY;

    draggedCircle.parentElement.style.width = `${newWidth}px`;
    draggedCircle.parentElement.style.height = `${newHeight}px`;
  }

  function handleCircleDragEnd(event) {
    draggedCircle = null;
    originalSize = null;
  }

  document.addEventListener('keydown', function (event) {
    if (lastClickedElement) {
      let moveAmount = 5; // 2px for absolute, 0.5% for scale
      let rect = lastClickedElement.getBoundingClientRect();
      let left = rect.left;
      let top = rect.top;

      if(positionType == "absolute") {
      switch (event.key) {
        case 'ArrowUp':
          lastClickedElement.style.top = `${top - moveAmount}px`;
          break;
        case 'ArrowDown':
          lastClickedElement.style.top = `${top + moveAmount}px`;
          break;
        case 'ArrowLeft':
          lastClickedElement.style.left = `${left - moveAmount}px`;
          break;
        case 'ArrowRight':
          lastClickedElement.style.left = `${left + moveAmount}px`;
          break;
      }
      } else {
        top = lastClickedElement.style.top;
        left = lastClickedElement.style.left;
        top = top.substring(0, left.length - 1);
        left = left.substring(0, left.length - 1);
        top = Number(top);
        left = Number(left);
        
        console.log(top, left);
        moveAmount = 1;
        switch (event.key) {
          case 'ArrowUp':
            lastClickedElement.style.top = `${top - moveAmount}%`;
            break;
          case 'ArrowDown':
            lastClickedElement.style.top = `${top + moveAmount}%`;
            break;
          case 'ArrowLeft':
            lastClickedElement.style.left = `${left - moveAmount}%`;
            break;
          case 'ArrowRight':
            lastClickedElement.style.left = `${left + moveAmount}%`;
            break;
        }
      }
    }
  });

});
