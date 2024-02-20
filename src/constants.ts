export const Tabs = {
  words: 'words',
  mastered: 'mastered',
  export: 'export',
} as const;

export const TabsList: ReadonlyMap<keyof typeof Tabs, string> = new Map([
  [Tabs.words, 'Words'],
  [Tabs.mastered, 'Mastered'],
  [Tabs.export, 'Export'],
]);

export const freeDictionaryApiUrl =
  'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const localStorageSavedWordsKey = 'wordsList';
export const localStorageMsteredWordsKey = 'masteredwordsList';

export const maxEntriesPerWordCardWhenExpanded = 4;
export const maxEntriesPerWordCardWhenCollapsed = 2;
