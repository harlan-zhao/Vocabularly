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
