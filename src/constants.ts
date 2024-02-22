export const Tabs = {
  words: 'words',
  mastered: 'mastered',
  settings: 'settings',
} as const;

export const TabsList: ReadonlyMap<keyof typeof Tabs, string> = new Map([
  [Tabs.words, 'Words'],
  [Tabs.mastered, 'Mastered'],
  [Tabs.settings, 'Settings'],
]);

export const sortKeys = {
  alpha: 'alpha',
  date: 'date',
} as const;

export const sortTypes = {
  asc: 'asc',
  desc: 'desc',
} as const;

export const localStorageSavedWordsKey = 'wordsList';
export const localStorageMsteredWordsKey = 'masteredwordsList';
export const settingsKey = 'settings';

export const maxEntriesPerWordCardWhenExpanded = 4;
export const maxEntriesPerWordCardWhenCollapsed = 2;
