import './Words.css';
import { useRef, useState, useEffect } from 'react';
import WordCard from './components/WordCard/WordCard';
import { LocalStorageData, TabType } from 'src/types';
import { cleanDefinitionData } from 'src/helpers';
import {
  localStorageSavedWordsKey,
  localStorageMsteredWordsKey,
  Tabs,
} from 'src/constants';
import {
  createOrUpdateSavedWords,
  getDefinition,
  getSavedWords,
  moveItemFromOrToMasteredMap,
} from 'src/services';

const Words = ({
  currentTab,
  setWordsCount,
}: {
  currentTab: TabType;
  setWordsCount: React.Dispatch<
    React.SetStateAction<{ [Tabs.words]: number; [Tabs.mastered]: number }>
  >;
}) => {
  const wordInput = useRef<HTMLInputElement>(null);
  const [wordsWithDefinitionsMap, setWordsWithDefinitionsMap] =
    useState<LocalStorageData>({});
  const [masteredWordsWithDefinitionsMap, setMasteredWordsWithDefinitionsMap] =
    useState<LocalStorageData>({});
  const [wordsMarkedAsMastered, setWordsMarkedAsMastered] = useState<
    Map<string, boolean>
  >(new Map());
  const isOnNewWordsPage = currentTab === Tabs.words;
  const isOnMasteredWordsPage = currentTab === Tabs.mastered;
  const currentPageItems = isOnMasteredWordsPage
    ? Object.values(masteredWordsWithDefinitionsMap)
    : Object.values(wordsWithDefinitionsMap);

  useEffect(() => {
    const getWords = async () => {
      if (isOnMasteredWordsPage) {
        const masteredWords = await getSavedWords(localStorageMsteredWordsKey);
        setWordsMarkedAsMastered(
          new Map(Object.keys(masteredWords).map((word) => [word, true]))
        );
        setMasteredWordsWithDefinitionsMap(masteredWords);
      } else {
        const words = await getSavedWords(localStorageSavedWordsKey);
        setWordsWithDefinitionsMap(words);
      }
    };
    getWords();
  }, [isOnMasteredWordsPage]);

  useEffect(() => {
    setWordsCount({
      [Tabs.words]: Object.keys(wordsWithDefinitionsMap).length,
      [Tabs.mastered]: Object.keys(masteredWordsWithDefinitionsMap).length,
    });
  }, [wordsWithDefinitionsMap, masteredWordsWithDefinitionsMap, setWordsCount]);

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

    setWordsWithDefinitionsMap((prevMap) => {
      const newData = { ...prevMap };
      newData[word] = cleanedDefinitionData;
      return newData;
    });
    createOrUpdateSavedWords(cleanedDefinitionData);
  };

  const onMasterOrUnMasterWord = (word: string) => {
    if (wordsMarkedAsMastered.get(word)) {
      setWordsMarkedAsMastered((prev) => {
        const newMap = new Map(prev);
        newMap.delete(word);
        return newMap;
      });
      moveItemFromOrToMasteredMap(
        localStorageMsteredWordsKey,
        localStorageSavedWordsKey,
        word
      );
    } else {
      setWordsMarkedAsMastered((prev) => {
        const newMap = new Map(prev);
        newMap.set(word, true);
        return newMap;
      });
      moveItemFromOrToMasteredMap(
        localStorageSavedWordsKey,
        localStorageMsteredWordsKey,
        word
      );
    }
    return;
  };

  return (
    <div className="wordsSection">
      {isOnNewWordsPage && (
        <div className="wordButton">
          <input className="wordInput" ref={wordInput} />
          <button className="addWordButton" onClick={getWordDefinition}>
            Get Word
          </button>
        </div>
      )}

      {Array.from(currentPageItems)
        .reverse()
        .map((definition, index) => (
          <WordCard
            key={index}
            definition={definition}
            isLastItem={index === currentPageItems.length - 1}
            isMastered={wordsMarkedAsMastered.get(definition.word) || false}
            onMasterOrUnMasterWord={onMasterOrUnMasterWord}
          />
        ))}
    </div>
  );
};

export default Words;
