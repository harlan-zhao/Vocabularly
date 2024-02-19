type Tabs = {
  words: string;
  mastered: string;
  export: string;
};

export const tabs: ReadonlyMap<keyof Tabs, string> = new Map([
  ['words', 'Words'],
  ['mastered', 'Mastered'],
  ['export', 'Export'],
]);

export const defaultTab = 'words';

export const freeDictionaryApiUrl =
  'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const localStorageSavedWordsKey = 'wordsList';
export const localStorageMsteredWordsKey = 'masteredwordsList';

export const maxEntriesPerWordCardWhenExpanded = 3;
export const maxEntriesPerWordCardWhenCollapsed = 1;
