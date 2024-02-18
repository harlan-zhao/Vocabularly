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
