import {
  freeDictionaryApiUrl,
  localStorageSavedWordsKey,
  localStorageMsteredWordsKey,
} from './constants';
import {
  CleanWordDefinition,
  LocalStorageData,
  localStorageKeyType,
} from './types';

export const getDefinition = async (word: string) => {
  const definition = await fetch(`${freeDictionaryApiUrl}${word}`).then(
    (response) => response.json()
  );
  return definition;
};

export const getSavedWords = (
  key: localStorageKeyType
): Promise<LocalStorageData> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, function (result) {
      if (result && result[key]) {
        resolve(result[key] as LocalStorageData);
      } else {
        resolve({} as LocalStorageData);
      }
    });
  });
};

export const createOrUpdateSavedWords = async (
  newItem: CleanWordDefinition
) => {
  const localStorageData = await getSavedWords(localStorageSavedWordsKey);
  const masteredStorageData = await getSavedWords(localStorageMsteredWordsKey);
  if (masteredStorageData[newItem.word] || localStorageData[newItem.word]) {
    return;
  }
  localStorageData[newItem.word] = newItem;
  chrome.storage.local.set({ [localStorageSavedWordsKey]: localStorageData });
};

export const deleteFromSavedWords = async (key: localStorageKeyType) => {
  const localStorageData = await getSavedWords(key);
  delete localStorageData[key];
  chrome.storage.local.set({ [key]: localStorageData });
};

export const moveItemFromOrToMasteredMap = async (
  fromKey: localStorageKeyType,
  toKey: localStorageKeyType,
  wordName: string
) => {
  try {
    const fromLocalStorageData = await getSavedWords(fromKey);
    const toLocalStorageData = await getSavedWords(toKey);

    const wordDefinition = fromLocalStorageData[wordName];
    if (!wordDefinition) {
      return;
    }
    delete fromLocalStorageData[wordName];
    toLocalStorageData[wordName] = wordDefinition;
    chrome.storage.local.set({ [fromKey]: fromLocalStorageData });
    chrome.storage.local.set({ [toKey]: toLocalStorageData });
  } catch (error) {
    console.error(error);
  }
};
