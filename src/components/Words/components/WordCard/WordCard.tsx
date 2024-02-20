import './WordCard.css';
import { useState, useRef } from 'react';
import { CleanWordDefinition } from 'src/types';
import {
  maxEntriesPerWordCardWhenExpanded,
  maxEntriesPerWordCardWhenCollapsed,
} from 'src/constants';
import Tooltip from 'src/components/ToolTip/ToolTip';
import AddToMasteredButton from '../AddToMasteredButton/AddToMasteredButton';
import { getValidPronounciation } from 'src/helpers';
import volumnIcon from 'src/assets/volume-high-outline.svg';

const WordCard = ({
  definition,
  isMastered,
  onMasterOrUnMasterWord,
  isLastItem,
}: {
  definition: CleanWordDefinition;
  isMastered: boolean;
  onMasterOrUnMasterWord: (word: string) => void;
  isLastItem: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { audioUrl, phoneticString } = getValidPronounciation(definition);

  if (!definition) {
    return null;
  }

  const playAudio = () => {
    if (!audioRef.current || !audioUrl) {
      return;
    }
    audioRef.current.play();
  };

  return (
    <div className={`wordCard ${isLastItem && 'lastItem'}`}>
      <div className="wordTitleSection">
        <Tooltip
          text={
            !isMastered ? 'Mark word as mastered' : 'Mark word as un-mastered'
          }
        >
          <AddToMasteredButton
            isMastered={isMastered}
            onClick={() => onMasterOrUnMasterWord(definition.word)}
          />
        </Tooltip>

        <span className="word" onClick={() => setShowMore((prev) => !prev)}>
          {definition.word}
        </span>
        {phoneticString && (
          <>
            <div
              className={`phonetics ${!audioUrl && 'noAudio'}`}
              onClick={playAudio}
            >
              <img src={volumnIcon} alt="icon" width="12" height="12" />
              <span className="phoneticString">{phoneticString}</span>
            </div>
            <audio ref={audioRef} src={audioUrl} />
          </>
        )}
      </div>

      <div className="definitions">
        {definition.meanings?.map((meaning, index) => {
          return (
            <>
              <span
                key={index}
                className="partOfSpeech"
                title={meaning.partOfSpeech}
              >
                {meaning.partOfSpeech}
              </span>
              {meaning.definitions?.map((definition, index) => {
                if (!showMore && index >= maxEntriesPerWordCardWhenCollapsed) {
                  return null;
                }
                if (showMore && index >= maxEntriesPerWordCardWhenExpanded) {
                  return null;
                }
                return (
                  <span key={index} className="definitionText">
                    {definition.definition}
                  </span>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default WordCard;
