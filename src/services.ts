import { freeDictionaryApiUrl } from './constants';
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

export const createOrUpdateSavedWords = async (
  key: localStorageKeyType,
  newItem: CleanWordDefinition
) => {
  const localStorageData = await getSavedWords(key);
  localStorageData.set(key, newItem);
  chrome.storage.local.set({ [key]: localStorageData });
};

export const getSavedWords = (
  key: localStorageKeyType
): Promise<LocalStorageData> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, function (result) {
      if (result && result[key]) {
        resolve(result[key] as LocalStorageData);
      } else {
        resolve(new Map() as LocalStorageData);
      }
    });
  });
};

export const deleteFromSavedWords = async (key: localStorageKeyType) => {
  const localStorageData = await getSavedWords(key);
  localStorageData.delete(key);
  chrome.storage.local.set({ [key]: localStorageData });
};
