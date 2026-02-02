import './App.css';
import SpellImtes from './SpellItems.js';
import SpellItem from './SpellItem.js';
import dnd5eSpells from './json/dnd_spells_output.json';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const params = new URLSearchParams(window.location.search);
  let paramName = params.get('name');

  if (paramName) {
    paramName = paramName.replace(/^[^a-zA-Z\u30A0-\u30FF]+|[^a-zA-Z\u30A0-\u30FF]+$/g, '');
    let content = null;
    const spells = dnd5eSpells.spells;
    spells.forEach((spell) => {
      if ((spell.nameEN.toLowerCase() === paramName.toLowerCase()) || (spell.nameJP === paramName) || (spell.nameEN_5e && spell.nameEN_5e.toLowerCase() === paramName.toLowerCase()) || (spell.nameJP_5e && spell.nameJP_5e === paramName)) {
        content = <div className='SpellItemContainer'><SpellItem spellInfo={spell} type='All' key={0} /></div>;
      }
    });

    if (!content) {
      content = (
        <div>
          <p>"{paramName}" という呪文が見つかりません。</p>
          <p>
            呪文名は正しく指定する必要があります。<br></br>
            以下の点に注意してください。<br></br>
            ・英語名の場合はスペルミスがないか<br></br>
            ・日本語名の場合は全角カタカナで指定<br></br>
            ・中黒（・）や長音符（ー）などの抜けがないか<br></br>
          </p>
        </div>
      );
    }
    return content
  }

  return (
    <div>
    </div>
  );
}

export default App;
