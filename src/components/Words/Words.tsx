import './Words.css';
import { useRef, useState } from 'react';
import WordCard from './components/WordCard/WordCard';
import { CleanWordDefinition } from 'src/types';
import { getDefinition, cleanDefinitionData } from 'src/helpers';

const Words = () => {
  const wordInput = useRef<HTMLInputElement>(null);
  const [wordsWithDefinitions, setWordsWithDefinitions] = useState<
    CleanWordDefinition[]
  >([]);

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
    setWordsWithDefinitions((prev) => {
      return [...prev, cleanedDefinitionData];
    });
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
