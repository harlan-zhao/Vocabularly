import {
  localStorageSavedWordsKey,
  localStorageMsteredWordsKey,
} from './constants';
import { LocalStorageData, localStorageKeyType } from './types';

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

export const removeSavedWordFromStorage = (word: string): void => {
  [localStorageSavedWordsKey, localStorageMsteredWordsKey].forEach((key) => {
    getSavedWords(key as localStorageKeyType).then((result) => {
      const newMap = { ...result };
      delete newMap[word];
      chrome.storage.local.set({ [key]: newMap });
    });
  });
};
