import React, { useState } from 'react';

import { ReactSortableHocList } from './components/list/react-sortable-hoc';
import { DndKitList } from './components/list/dnd-kit';
import Toggle from 'react-toggle'

import './styles.css';
import 'react-toggle/style.css';

export const App: React.FunctionComponent<{}> = () => {
  const [hasDraggHandle, setHasDraggHandle] = useState(true);

  return (
    <div>
      <div className="toolbar">
        <div className="title">Sorting Libraries</div>
        <div className="toggle">
          <label>
            <Toggle
              defaultChecked={hasDraggHandle}
              onChange={() => setHasDraggHandle(!hasDraggHandle)} />
            <span>Use Dragging Handle</span>
          </label>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="library-name">@dnd-kit</div>
          <div className="list"><DndKitList hasDraggHandle={hasDraggHandle} /></div>
        </div>
        <div className="container">
          <div className="library-name">react-sortable-hoc</div>
          <div className="list"><ReactSortableHocList hasDraggHandle={hasDraggHandle} /></div>
        </div>
      </div>
    </div>
  );
}

export default App;