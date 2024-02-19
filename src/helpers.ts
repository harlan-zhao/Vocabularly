import { get } from 'lodash';
import { CleanWordDefinition } from './types';

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
    mastered: false,
  } as CleanWordDefinition;
};

export const getValidPronounciation = (definition: CleanWordDefinition) => {
  let audioUrl = get(definition, 'phonetics.[0].audio', '');
  let phoneticString = get(definition, 'phonetics.[0].text', '');

  for (let i = 1; i < definition.phonetics.length; i++) {
    const currentAudioUrl = get(definition, `phonetics.[${i}].audio`, '');
    const currentPhoneticString = get(definition, `phonetics.[${i}].text`, '');
    if (currentAudioUrl && currentPhoneticString) {
      audioUrl = currentAudioUrl;
      phoneticString = currentPhoneticString;
      break;
    }
  }
  return { audioUrl, phoneticString };
};
