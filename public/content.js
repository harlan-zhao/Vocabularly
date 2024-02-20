let debounceTimer;
let button = null;
let windowDiv = null;
let selectedText = null;

function debounce(func, delay) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(func, delay);
}

function createButton(rect) {
  if (button) {
    button.remove();
  }
  button = document.createElement('button');
  button.textContent = 'Open Window';
  button.style.position = 'absolute';
  button.style.left = `${rect.left + window.pageXOffset}px`;
  button.style.top = `${rect.top + window.pageYOffset}px`;
  button.style.zIndex = '9999';
  button.onclick = () => {
    button.style.display = 'none';
    createWindow(rect);
  };
  document.body.appendChild(button);
}

function createWindow(rect) {
  if (windowDiv) {
    windowDiv.remove();
  }

  windowDiv = document.createElement('div');
  windowDiv.textContent = selectedText;
  windowDiv.style.position = 'absolute';
  windowDiv.style.width = '200px';
  windowDiv.style.height = '100px';
  windowDiv.style.backgroundColor = 'white';
  windowDiv.style.border = '1px solid black';
  windowDiv.style.zIndex = '9999';
  windowDiv.style.left = `${rect.left + window.pageXOffset}px`;
  windowDiv.style.top = `${rect.bottom + window.pageYOffset}px`;
  windowDiv.onclick = (event) => {
    event.stopPropagation();
  };

  document.addEventListener('click', outsideClickListener);
  document.body.appendChild(windowDiv);
}

function outsideClickListener(event) {
  if (
    windowDiv &&
    !windowDiv.contains(event.target) &&
    event.target !== button
  ) {
    windowDiv.remove();
    button.style.display = 'inline';
    windowDiv = null;
    selectedText = null;
    document.removeEventListener('click', outsideClickListener);
  }
}

document.addEventListener('selectionchange', () => {
  const selection = window.getSelection();
  if (!selection || selection.toString().length === 0) {
    selectedText = null;
    if (button) {
      button.remove();
    }
    return;
  }
  selectedText = selection.toString();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  debounce(() => createButton(rect), 300);
});

createButton({ left: 0, top: 0 });
