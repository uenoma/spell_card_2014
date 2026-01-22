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
      if ((spell.nameEN.toLowerCase() === paramName.toLowerCase()) || (spell.nameJP === paramName)) {
        content = <div className='SpellItemContainer'><SpellItem spellInfo={spell} type='All' key={0} /></div>;
      }
    });

    if (!content) {
      content = <div>"{paramName}" という呪文が見つかりません。</div>
    }
    return content
  }

  return (
    <div>
    </div>
  );
}

export default App;
