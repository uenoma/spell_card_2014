import './App.css';
import SpellImtes from './SpellItems.js';
import SpellItem from './SpellItem.js';
import dnd5eSpells from './json/dnd_spells_output.json';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const params = new URLSearchParams(window.location.search);
  const paramName = params.get('name');

  const [content, setContent] = useState("");
  const [spellFile, setSpellFile] = useState(null);

  const update = (e) => {
    if (paramName) {
      return;
    }

    var isClass = false;
    for (var index = 0; index < 10; index++) {
      var checkboxId = "selected" + index;
      const element = document.getElementById(checkboxId);
      if (element.checked) {
        isClass = true;
      }
    }


    if (spellFile && !isClass) {
      let reader = new FileReader()
      reader.onloadend = () => {
        var items = [];
        items = reader.result.split(/\r\n|\n|\r/);
        createContentByList(items);
      }
      reader.onerror = () => {
        setSpellFile(null)
      }
      reader.readAsText(spellFile)
    } else {
      createContent();
    }
  }

  const classTypes = () => {
    const types = ["All", "Wizard", "Warlock", "Cleric", "Sorcerer", "Druid", "Bard", "Paladin", "Ranger", "Artificer"];

    var selectedTypes = [];
    types.forEach((type, index) => {
      var checkboxId = "selected" + index;
      const element = document.getElementById(checkboxId);
      if (element.checked) {
        selectedTypes.push(type);
      }
      index++;
    })
    return selectedTypes;
  }

  const createContent = () => {

    var spellLevel = document.getElementById("spellLevel").value;
    var keyword = document.getElementById("keyword").value;

    var spellInfos = [];
    classTypes().forEach((type, index) => {
      spellInfos.push(<SpellImtes spellInfos={dnd5eSpells} type={type} level={spellLevel} keyword={keyword.trim()} key={index} />);
      index++;
    });
    setContent(spellInfos);
  }

  const createContentByList = (items) => {
    var spellNames = [];
    items.forEach((item) => {
      spellNames.push(item.trim());
    });

    if (spellNames.length > 0) {
      var spellLevel = document.getElementById("spellLevel").value;
      var keyword = document.getElementById("keyword").value;

      var spellInfos = [];
      spellInfos.push(<SpellImtes spellInfos={dnd5eSpells} type='All' level={spellLevel} spellNames={spellNames} keyword={keyword.trim()} />);
      setContent(spellInfos);
    }
  }

  const importSpellList = (e) => {
    const files = e.currentTarget.files;
    if (!files || files?.length === 0) return;
    setSpellFile(files[0])
  }

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    update();
  }, [spellFile]);

  if (paramName) {
    let content = null;
    const spells = dnd5eSpells.spells;
    spells.forEach((spell) => {
      if ((spell.nameEN === paramName) || (spell.nameJP === paramName)) {
        content = <div className='SpellItemContainer'><SpellItem spellInfo={spell} type='All' key={0} /></div>;
      }
    });

    if (!content) {
      content = <div>{paramName} という呪文が見つかりません。</div>
    }
    return content
  }

  return (
    <div>
      <div className="Print-None">
      <div className='AppSelectButtons'>
        <div className='AppImportButton'>
          呪文リスト<input type='file' accept='.txt' onChange={(e) => importSpellList(e)}></input>
        </div>
      </div>

      <div className='AppSelectButtons'>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected0" onChange={(e) => update(e)} />すべて</label></div>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected1" onChange={(e) => update(e)} />ウィザード</label></div>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected2" onChange={(e) => update(e)} />ウォーロック</label></div>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected3" onChange={(e) => update(e)} />クレリック</label></div>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected4" onChange={(e) => update(e)} />ソーサラー</label></div>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected5" onChange={(e) => update(e)} />ドルイド</label></div>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected6" onChange={(e) => update(e)} />バード</label></div>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected7" onChange={(e) => update(e)} />パラディン</label></div>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected8" onChange={(e) => update(e)} />レンジャー</label></div>
        <div className='AppSelectButtonItem'><label><input type="checkbox" id="selected9" onChange={(e) => update(e)} />アーティフィサー</label></div>
      </div>

      <div className='AppSelectButtons'>
        呪文レベル
        <select name="呪文レベル" className='AppSelectLevel' id='spellLevel' onChange={(e) => update(e)}>
          <option>すべて</option>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
        </select>
      </div>

      <div className='AppSelectButtons'>

        <div className='AppSearch'>
          <span>検索</span><input id='keyword' onChange={(e) => update(e)}></input>
        </div>

      </div>
      </div>
      
      <div>
        {content}
      </div>
      <div className='AppPolicy Print-None'>このページはファンコンテンツ・ポリシーに沿った非公式のファンコンテンツです。ウィザーズ社の認可/許諾は得ていません。題材の一部に、ウィザーズ・オブ・ザ・コースト社の財産を含んでいます。©Wizards of the Coast LLC.</div>
    </div>

  );
}

export default App;
