let debounceTimer;
let button = null;
let windowDiv = null;
let selectedText = null;
let currentWindowText = null;

const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = chrome.runtime.getURL('content.css'); // Path to your CSS file
(document.head || document.documentElement).appendChild(link);

function debounce(func, delay) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(func, delay);
}

function createButton(rect) {
  if (button) {
    button.remove();
  }
  button = document.createElement('button');
  button.classList.add('popUpButton');
  button.style.left = `${rect.left + 32 + window.pageXOffset}px`;
  button.style.top = `${rect.top + window.pageYOffset}px`;

  const pngButton = document.createElement('img');
  pngButton.alt = 'icon';
  pngButton.width = '24';
  pngButton.height = '24';
  pngButton.classList.add('vocabularyIcon');
  button.appendChild(pngButton);
  pngButton.src = chrome.runtime.getURL('/assets/vocabulary.png');

  button.onclick = () => {
    button.style.display = 'none';
    createWindow(rect);
  };
  document.body.appendChild(button);
}

async function createWindow(rect) {
  if (windowDiv) {
    windowDiv.remove();
  }

  if (selectedText === currentWindowText) {
    return;
  }
  let definition = null;
  let isWordInStorage = false;
  const wordInStorage = await checkIfWordInStorage(selectedText);

  if (wordInStorage) {
    definition = wordInStorage;
    isWordInStorage = true;
  } else {
    const value = await getDefinition(selectedText);
    definition = cleanDefinitionData(value);
    isWordInStorage = false;
  }

  windowDiv = document.createElement('div');
  windowDiv.classList.add('window'); // Apply the CSS class
  windowDiv.style.userSelect = 'none';
  windowDiv.style.left = `${rect.left + window.pageXOffset}px`;
  windowDiv.style.top = `${rect.bottom - 20 + window.pageYOffset}px`;
  windowDiv.onclick = (event) => {
    event.stopPropagation();
  };
  if (!definition) {
    windowDiv.textContent = 'No definition found';
    document.addEventListener('click', outsideClickListener);
    document.body.appendChild(windowDiv);
    return;
  }

  const { audioUrl, phoneticString } = getValidPronounciation(definition);
  const divWordTitleSection = document.createElement('div');
  divWordTitleSection.classList.add('wordTitleSectionOnPage');

  const spanWord = document.createElement('span');
  spanWord.classList.add('word');
  spanWord.textContent = definition.word;

  divWordTitleSection.appendChild(spanWord);

  if (phoneticString) {
    const divPhonetics = document.createElement('div');
    if (audioUrl) {
      divPhonetics.classList.add('phoneticsOnPage');
    }
    const imgVolumnIcon = document.createElement('img');
    imgVolumnIcon.src = chrome.runtime.getURL(
      '/assets/volume-high-outline.svg'
    );
    imgVolumnIcon.alt = 'icon';
    imgVolumnIcon.width = '14';
    imgVolumnIcon.height = '14';

    const spanPhoneticString = document.createElement('span');
    spanPhoneticString.classList.add('phoneticStringOnPage');
    spanPhoneticString.textContent = phoneticString;

    const audioElement = document.createElement('audio');
    audioElement.src = audioUrl;
    divPhonetics.onclick = () => {
      if (audioElement) {
        audioElement.play();
      }
    };

    divPhonetics.appendChild(imgVolumnIcon);
    divPhonetics.appendChild(spanPhoneticString);
    divWordTitleSection.appendChild(divPhonetics);
    divWordTitleSection.appendChild(audioElement);
  }
  const bookMarkButtonSrcs = [
    '/assets/bookmark-outline.svg',
    '/assets/bookmark-outline-success.svg',
  ];
  let currentSrc = isWordInStorage ? 1 : 0;

  const divSaveButton = document.createElement('div');
  divSaveButton.classList.add('saveButtonContainer');

  const bookMarkButton = document.createElement('img');
  bookMarkButton.classList.add('bookmark');
  bookMarkButton.src = chrome.runtime.getURL(bookMarkButtonSrcs[currentSrc]);

  const saveText = document.createElement('span');
  saveText.classList.add('saveText');
  saveText.textContent = currentSrc === 0 ? 'Save Word' : 'Saved';

  if (currentSrc === 1) {
    saveText.classList.add('saved');
  }

  divSaveButton.onclick = () => {
    saveText.classList.toggle('saved');
    if (currentSrc === 0) {
      currentSrc = 1;
      bookMarkButton.src = chrome.runtime.getURL(bookMarkButtonSrcs[1]);
      saveText.textContent = 'Saved';
      // Save the word to local storage
      saveWordToStorage(definition);
    } else {
      currentSrc = 0;
      bookMarkButton.src = chrome.runtime.getURL(bookMarkButtonSrcs[0]);
      saveText.textContent = 'Save Word';
      // Remove the word from local storage
      removeWordFromStorage(definition.word);
    }
  };

  bookMarkButton.alt = 'icon';
  bookMarkButton.width = '16';
  bookMarkButton.height = '16';

  divSaveButton.appendChild(bookMarkButton);
  divSaveButton.appendChild(saveText);

  divWordTitleSection.appendChild(divSaveButton);

  windowDiv.appendChild(divWordTitleSection);
  const divDefinitions = document.createElement('div');
  divDefinitions.classList.add('definitions');

  for (
    let meaningIndex = 0;
    meaningIndex < Math.min(1, definition.meanings.length);
    meaningIndex++
  ) {
    const meaning = definition.meanings[meaningIndex];
    for (
      let index = 0;
      index < Math.min(2, meaning.definitions.length);
      index++
    ) {
      const definition = meaning.definitions[index];

      const spanPartOfSpeech = document.createElement('span');
      spanPartOfSpeech.classList.add('partOfSpeech');
      spanPartOfSpeech.title = meaning.partOfSpeech;
      spanPartOfSpeech.textContent = meaning.partOfSpeech;

      const spanDefinitionText = document.createElement('span');
      spanDefinitionText.classList.add('definitionText');
      spanDefinitionText.textContent = definition.definition;

      divDefinitions.appendChild(spanPartOfSpeech);
      divDefinitions.appendChild(spanDefinitionText);
    }
  }

  windowDiv.appendChild(divDefinitions);
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
  if (!selection || selection.toString().trim().length === 0) {
    selectedText = null;
    if (button) {
      button.remove();
    }
    return;
  }
  selectedText = selection.toString().trim();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  debounce(() => createButton(rect), 300);
});

async function getDefinition(word) {
  return await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  ).then((response) => response.json());
}

const cleanDefinitionData = (definition) => {
  if (definition?.message) {
    return false;
  }

  const dataToBeCleaned = definition[0];
  const word = dataToBeCleaned?.word || '';

  if (!dataToBeCleaned || !word) {
    return false;
  }

  const { meanings, phonetics, sourceUrls } = dataToBeCleaned;

  return {
    word,
    meanings: meanings || [],
    phonetics: phonetics || [],
    sourceUrl: sourceUrls?.[0] || '',
  };
};

const getValidPronounciation = (definition) => {
  let audioUrl = '';
  let phoneticString = '';
  if (!definition || !definition.phonetics || !definition.phonetics.length) {
    return { audioUrl, phoneticString };
  }
  audioUrl = definition.phonetics[0]?.audio;
  phoneticString = definition.phonetics[0]?.text;

  for (let i = 0; i < definition.phonetics.length; i++) {
    const currentAudioUrl = definition.phonetics[i]?.audio || '';
    const currentPhoneticString = definition.phonetics[i]?.text || '';
    if (currentAudioUrl && currentPhoneticString) {
      audioUrl = currentAudioUrl;
      phoneticString = currentPhoneticString;
      break;
    }
  }
  return { audioUrl, phoneticString };
};

const checkIfWordInStorage = async (word) => {
  const localStorageData = await getSavedWords('wordsList');
  const masteredStorageData = await getSavedWords('masteredwordsList');

  if (!masteredStorageData[word] && !localStorageData[word]) {
    return false;
  } else {
    return localStorageData[word] || masteredStorageData[word];
  }
};

const getSavedWords = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, function (result) {
      if (result && result[key]) {
        resolve(result[key]);
      } else {
        resolve({});
      }
    });
  });
};

const saveWordToStorage = async (definition) => {
  const localStorageData = await getSavedWords('wordsList');
  localStorageData[definition.word] = {
    definition,
    date: new Date().toISOString(),
  };
  chrome.storage.local.set({ wordsList: localStorageData });
};

const removeWordFromStorage = async (word) => {
  const localStorageData = await getSavedWords('wordsList');
  delete localStorageData[word];
  chrome.storage.local.set({ wordsList: localStorageData });
};
