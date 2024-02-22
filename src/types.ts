import {
  localStorageSavedWordsKey,
  localStorageMsteredWordsKey,
  Tabs,
  sortKeys,
  sortTypes,
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
  date: string;
};

export type LocalStorageData = {
  [key: string]: CleanWordDefinition;
};

export type SettingsData = {
  sortKey: SortKeyType;
  sortType: SortTypeType;
};

export type localStorageKeyType =
  | typeof localStorageSavedWordsKey
  | typeof localStorageMsteredWordsKey;

export type TabType = keyof typeof Tabs;

export type SortKeyType = keyof typeof sortKeys;
export type SortTypeType = keyof typeof sortTypes;
