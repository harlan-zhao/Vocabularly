import {
  localStorageSavedWordsKey,
  localStorageMsteredWordsKey,
  Tabs,
} from './constants';

type Definition = {
  definition: string;
  example?: string;
};

type Meaning = {
  definitions: Definition[];
  partOfSpeech: string;
};

type Phonetic = {
  text: string;
  audio?: string;
};

export type CleanWordDefinition = {
  word: string;
  meanings: Meaning[];
  phonetics: Phonetic[];
  sourceUrl: string;
};

export type LocalStorageData = {
  [key: string]: CleanWordDefinition;
};

export type localStorageKeyType =
  | typeof localStorageSavedWordsKey
  | typeof localStorageMsteredWordsKey;

export type TabType = keyof typeof Tabs;
