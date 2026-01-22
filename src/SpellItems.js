import './SpellItems.css';
import SpellItem from './SpellItem.js';
import { useCallback, useEffect, useState } from 'react';

function SpellItems(props) {

  const [content, setContent] = useState("");

  const createContent = (spellInfos, type, level, keyword) => {

    var cards = [];
    spellInfos.spells.forEach((spellInfo, index) => {

      if (type === 'All' || spellInfo[type] === '○') {
        if (level === 'すべて' || Number(level) === Number(spellInfo.level)) {
          if (!spellInfo.ritual) {
            spellInfo.ritual = '';
          }
          var isContain = true;
          if (keyword.length > 0) {
            if (spellInfo.description) {
              if ((spellInfo.nameJP.indexOf(keyword) < 0) &&
                (spellInfo.nameEN.indexOf(keyword) < 0) &&
                (spellInfo.type.indexOf(keyword) < 0) &&
                (spellInfo.ritual.indexOf(keyword) < 0) &&
                (spellInfo.wait.indexOf(keyword) < 0) &&
                (spellInfo.range.indexOf(keyword) < 0) &&
                (spellInfo.materials.indexOf(keyword) < 0) &&
                (spellInfo.description.indexOf(keyword) < 0) &&
                (spellInfo.source.indexOf(keyword) < 0)) {
                isContain = false;
              }
            } else {
              isContain = false;
            }
          }
          if (isContain) {
            cards.push(<SpellItem spellInfo={spellInfo} type={type} key={index} />);
          }
        }
        index++;
      }
    });
    setContent(cards);
  }

  const createContentByNames = (spellInfos, type, level, names, keyword) => {

    var cards = [];
    spellInfos.spells.forEach((spellInfo, index) => {
      var isTarget = false;
      names.forEach((spellName) => {
        if ((spellName === spellInfo.nameJP) || (spellName === spellInfo.nameEN)) {
          isTarget = true;
        }
      });

      if (isTarget) {
        if (level === 'すべて' || Number(level) === Number(spellInfo.level)) {

          if (!spellInfo.ritual) {
            spellInfo.ritual = '';
          }
          var isContain = true;
          if (keyword.length > 0) {
            if (spellInfo.description) {
              if ((spellInfo.nameJP.indexOf(keyword) < 0) &&
                (spellInfo.nameEN.indexOf(keyword) < 0) &&
                (spellInfo.type.indexOf(keyword) < 0) &&
                (spellInfo.ritual.indexOf(keyword) < 0) &&
                (spellInfo.wait.indexOf(keyword) < 0) &&
                (spellInfo.range.indexOf(keyword) < 0) &&
                (spellInfo.materials.indexOf(keyword) < 0) &&
                (spellInfo.description.indexOf(keyword) < 0) &&
                (spellInfo.source.indexOf(keyword) < 0)) {
                isContain = false;
              }
            } else {
              isContain = false;
            }
          }
          if (isContain) {
            cards.push(<SpellItem spellInfo={spellInfo} type={type} key={index} />);
          }
          index++;
        }
      }
    });
    setContent(cards);
  }

  useEffect(() => {
    if (props.spellNames) {
      createContentByNames(props.spellInfos, props.type, props.level, props.spellNames, props.keyword);
    } else {
      createContent(props.spellInfos, props.type, props.level, props.keyword);
    }
  }, [props]);

  return (
    <div className='SpellCardItems'>
      {content}
    </div>
  );

};

export default SpellItems;
