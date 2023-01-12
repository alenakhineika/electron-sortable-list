import React from 'react';

import { ReactSortableHocList } from './components/list/react-sortable-hoc';
import { DndKitList } from './components/list/dnd-kit';

import './styles.css';

export const App: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <h1 className="title">Sorting Libraries</h1>
      <div className="wrapper">
        <div className="container">
          <div className="library-name">@dnd-kit</div>
          <div className="list"><DndKitList /></div>
        </div>
        <div className="container">
          <div className="library-name">react-sortable-hoc</div>
          <div className="list"><ReactSortableHocList /></div>
        </div>
      </div>
    </div>
  );
}

export default App;