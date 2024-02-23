import './Words.css';
import { useState, useEffect } from 'react';
import WordCard from './components/WordCard/WordCard';
import {
  LocalStorageData,
  TabType,
  SettingsData,
  CleanWordDefinition,
} from 'src/types';
import EmptyState from './components/EmptyState/EmptyState';
import {
  localStorageSavedWordsKey,
  localStorageMsteredWordsKey,
  Tabs,
  sortKeys,
  sortTypes,
} from 'src/constants';
import {
  getSavedWords,
  moveItemFromOrToMasteredMap,
  removeSavedWordFromStorage,
} from 'src/services';

const Words = ({
  currentTab,
  setWordsCount,
  settings,
}: {
  currentTab: TabType;
  setWordsCount: React.Dispatch<
    React.SetStateAction<{ [Tabs.words]: number; [Tabs.mastered]: number }>
  >;
  settings: SettingsData;
}) => {
  const [wordsWithDefinitionsMap, setWordsWithDefinitionsMap] =
    useState<LocalStorageData>({});
  const [masteredWordsWithDefinitionsMap, setMasteredWordsWithDefinitionsMap] =
    useState<LocalStorageData>({});

  const [itemsToShow, setItemsToShow] = useState<CleanWordDefinition[]>([]);
  const [wordsMarkedAsMastered, setWordsMarkedAsMastered] = useState<
    Map<string, boolean>
  >(new Map());
  const isOnMasteredWordsPage = currentTab === Tabs.mastered;
  const currentPageItems = isOnMasteredWordsPage
    ? Object.values(masteredWordsWithDefinitionsMap)
    : Object.values(wordsWithDefinitionsMap);
  const isPageEmpty = currentPageItems.length === 0;

  useEffect(() => {
    let items = isOnMasteredWordsPage
      ? Object.values(masteredWordsWithDefinitionsMap)
      : Object.values(wordsWithDefinitionsMap);

    if (settings.sortKey === sortKeys.date) {
      items = items.sort((a, b) => {
        return new Date(b.date!).getTime() - new Date(a.date!).getTime();
      });
    }
    if (settings.sortKey === sortKeys.alpha) {
      items = items.sort((a, b) => a?.word?.localeCompare(b.word!));
    }

    if (settings.sortType === sortTypes.desc) {
      items = items.reverse();
    }
    setItemsToShow(items);
  }, [
    currentTab,
    masteredWordsWithDefinitionsMap,
    wordsWithDefinitionsMap,
    settings,
  ]);

  useEffect(() => {
    const getWords = async () => {
      const masteredWords = await getSavedWords(localStorageMsteredWordsKey);
      setWordsMarkedAsMastered(
        new Map(Object.keys(masteredWords).map((word) => [word, true]))
      );
      setMasteredWordsWithDefinitionsMap(masteredWords);

      const words = await getSavedWords(localStorageSavedWordsKey);
      setWordsWithDefinitionsMap(words);
    };
    getWords();
  }, [currentTab]);

  useEffect(() => {
    setWordsCount({
      [Tabs.words]: Object.keys(wordsWithDefinitionsMap).length,
      [Tabs.mastered]: Object.keys(masteredWordsWithDefinitionsMap).length,
    });
  }, [wordsWithDefinitionsMap, masteredWordsWithDefinitionsMap, setWordsCount]);

  const onRemoveWord = (word: string) => {
    setWordsWithDefinitionsMap((prev) => {
      const newMap = { ...prev };
      delete newMap[word];
      return newMap;
    });
    setMasteredWordsWithDefinitionsMap((prev) => {
      const newMap = { ...prev };
      delete newMap[word];
      return newMap;
    });
    removeSavedWordFromStorage(word);
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
      {isPageEmpty && <EmptyState />}
      {Array.from(itemsToShow).map((definition, index) => (
        <WordCard
          key={index}
          definition={definition}
          isLastItem={index === currentPageItems.length - 1}
          isMastered={wordsMarkedAsMastered.get(definition.word) || false}
          onMasterOrUnMasterWord={onMasterOrUnMasterWord}
          onRemoveWord={onRemoveWord}
        />
      ))}
    </div>
  );
};

export default Words;
