import './WordCard.css';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { CleanWordDefinition } from 'src/types';

const WordCard = ({ definition }: { definition: CleanWordDefinition }) => {
  const [showMore, setShowMore] = useState(false);
  if (!definition) {
    return null;
  }

  const firstDefinition = definition.meanings[0] || [];
  const secondDefinition = definition.meanings[1] || [];

  return (
    <div className="wordCard">
      <span className="word" onClick={() => setShowMore((prev) => !prev)}>
        {definition.word}
      </span>
      <div className="definitions">
        {firstDefinition.partOfSpeech && (
          <span className="partOfSpeech">{firstDefinition.partOfSpeech}</span>
        )}
        {firstDefinition.definitions?.map((definition, index) => {
          if (!showMore && index > 1) {
            return null;
          }
          if (showMore && index > 3) {
            return null;
          }
          return (
            <span key={index} className="definitionText">
              {definition.definition}
            </span>
          );
        })}
        {showMore &&
          !isEmpty(secondDefinition) &&
          secondDefinition.partOfSpeech && (
            <span className="partOfSpeech secondPart">
              {secondDefinition.partOfSpeech}
            </span>
          )}
        {showMore &&
          secondDefinition.definitions?.map((definition, index) => {
            if (!showMore && index > 1) {
              return null;
            }
            if (showMore && index > 3) {
              return null;
            }
            return (
              <span key={index} className="definitionText">
                {definition.definition}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default WordCard;
