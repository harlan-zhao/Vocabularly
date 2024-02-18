import { get } from 'lodash';
import { CleanWordDefinition } from './types';
import { freeDictionaryApiUrl } from './constants';

export const cleanDefinitionData = (definition: any) => {
  const dataToBeCleaned = definition[0];
  const word = get(dataToBeCleaned, 'word', '');
  if (!dataToBeCleaned || !word) {
    return false;
  }
  return {
    word: word,
    meanings: get(dataToBeCleaned, 'meanings', []),
    phonetics: get(dataToBeCleaned, 'phonetics', []),
    sourceUrl: get(dataToBeCleaned, 'sourceUrls[0]', ''),
  } as CleanWordDefinition;
};

export const getDefinition = async (word: string) => {
  const definition = await fetch(`${freeDictionaryApiUrl}${word}`).then(
    (response) => response.json()
  );
  return definition;
};

export const createOrUpdateObject = (
  key: string,
  newData: CleanWordDefinition[]
) => {
  chrome.storage.local.set({ [key]: newData }, function () {
    console.log(`Object with key '${key}' updated in local storage`);
  });
};
