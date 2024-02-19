import './Words.css';
import { useRef, useState, useEffect } from 'react';
import WordCard from './components/WordCard/WordCard';
import { LocalStorageData } from 'src/types';
import { cleanDefinitionData } from 'src/helpers';
import { createOrUpdateSavedWords, getDefinition } from 'src/services';

const Words = () => {
  const wordInput = useRef<HTMLInputElement>(null);
  const [wordsWithDefinitionsMap, setWordsWithDefinitionsMap] =
    useState<LocalStorageData>(new Map());
  const [wordsMarkedAsMastered, setWordsMarkedAsMastered] = useState<
    Map<string, boolean>
  >(new Map());

  const getWordDefinition = async () => {
    const word = wordInput.current?.value;
    if (!word) {
      return;
    }
    const definition = await getDefinition(word);
    const cleanedDefinitionData = cleanDefinitionData(definition);
    if (!cleanedDefinitionData) {
      return;
    }
    // const newList = [...wordsWithDefinitions, cleanedDefinitionData];
    setWordsWithDefinitionsMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(word, cleanedDefinitionData);
      return newMap;
    });

    // createOrUpdateObject(localStorageWordsKey, newList);
  };

  const onMasterOrUnMasterWord = (word: string) => {
    if (wordsMarkedAsMastered.get(word)) {
      setWordsMarkedAsMastered((prev) => {
        const newMap = new Map(prev);
        newMap.delete(word);
        return newMap;
      });
    } else {
      setWordsMarkedAsMastered((prev) => {
        const newMap = new Map(prev);
        newMap.set(word, true);
        return newMap;
      });
    }
    return;
  };

  return (
    <div className="wordsSection">
      <div className="test">
        <input className="wordInput" ref={wordInput} />
        <button className="addWordButton" onClick={getWordDefinition}>
          Get Word
        </button>
      </div>
      {Array.from(wordsWithDefinitionsMap.values())
        .reverse()
        .map((definition, index) => (
          <WordCard
            key={index}
            definition={definition}
            isMastered={wordsMarkedAsMastered.get(definition.word) || false}
            onMasterOrUnMasterWord={onMasterOrUnMasterWord}
          />
        ))}
    </div>
  );
};

export default Words;
