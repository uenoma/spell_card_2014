import './SpellItem.css';
import { useCallback, useEffect, useState } from 'react';

function SpellItem(props) {

  const spellInfo = props.spellInfo;

  const ritual = spellInfo.ritual === "儀式" ? ' （儀式）' : "";

  const css = "SpellCardItem " + props.type;

  return (
    <div className={css}>
      <div className="SpellCardItemName">
        <div className="SpellCardItemNameJP">
          {spellInfo.nameJP}
        </div>
        <div className="SpellCardItemNameEN">
          {spellInfo.nameEN}
        </div>
      </div>

      <div className="SpellCardItemGroup">
        <div className="SpellCardItemGroupItemLeft">{spellInfo.level}レベル</div>
        <div className="SpellCardItemGroupItemRight">{spellInfo.type}{ritual}</div>
      </div>

      <div className="SpellCardItemTypes">
        <div className="SpellCardItemTypesItemLeft">
          <div className="SpellCardItemTypesItemTitle">
            発動時間
          </div>
          <div className="SpellCardItemTypesItemValue">
            {spellInfo.wait}
          </div>
        </div>
        <div className="SpellCardItemTypesItemRight">
          <div className="SpellCardItemTypesItemTitle">
            射程
          </div>
          <div className="SpellCardItemTypesItemValue">
            {spellInfo.range}
          </div>
        </div>
      </div>

      <div className="SpellCardItemTypes">
        <div className="SpellCardItemTypesItemLeft">
          <div className="SpellCardItemTypesItemTitle">
            構成要素
          </div>
          <div className="SpellCardItemTypesItemValue">
            {spellInfo.materials}
          </div>
        </div>
        <div className="SpellCardItemTypesItemRight">
          <div className="SpellCardItemTypesItemTitle">
            持続時間
          </div>
          <div className="SpellCardItemTypesItemValue">
            {spellInfo.time}
          </div>
        </div>
      </div>

      <div className="SpellCardItemDesctiption">
        {spellInfo.description}
      </div>
      <div className="SpellCardItemFooter">
        <div className='SpellCardItemFooterItemLeft'>
          {props.type}{" [" + props.spellInfo.source + "]"} 
        </div>
        <div className='SpellCardItemFooterItemRight'>
          D&D
        </div>
      </div>
    </div>
  )
};

export default SpellItem;
