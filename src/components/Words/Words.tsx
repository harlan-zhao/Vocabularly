import './Words.css';
import { useRef, useState, useEffect } from 'react';
import WordCard from './components/WordCard/WordCard';
import { CleanWordDefinition } from 'src/types';
import { localStorageWordsKey } from 'src/constants';
import {
  getDefinition,
  cleanDefinitionData,
  createOrUpdateObject,
} from 'src/helpers';

const Words = () => {
  const wordInput = useRef<HTMLInputElement>(null);
  const [wordsWithDefinitions, setWordsWithDefinitions] = useState<
    CleanWordDefinition[]
  >([]);
  console.log(chrome.storage);
  useEffect(() => {
    chrome.storage.local.get(localStorageWordsKey, function (result) {
      if (result && result[localStorageWordsKey]) {
        setWordsWithDefinitions(result[localStorageWordsKey]);
      }
    });
  }, [setWordsWithDefinitions]);

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
    const newList = [...wordsWithDefinitions, cleanedDefinitionData];
    setWordsWithDefinitions((prev) => {
      return [...prev, cleanedDefinitionData];
    });
    createOrUpdateObject(localStorageWordsKey, newList);
  };

  return (
    <div className="wordsSection">
      <div className="test">
        <input className="wordInput" ref={wordInput} />
        <button className="addWordButton" onClick={getWordDefinition}>
          Get Word
        </button>
      </div>
      {wordsWithDefinitions.map((definition, index) => (
        <WordCard key={index} definition={definition} />
      ))}
    </div>
  );
};

export default Words;
