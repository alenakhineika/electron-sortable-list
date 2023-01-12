import React, { useRef, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import type { DragHandleToolbarProps, SortableItem, SortableListProps, OnSortEndProps } from './../../types';

const DragHandleToolbar = SortableHandle(({ id }: DragHandleToolbarProps) => {
  return (<li className="sortable-item">Item {id}</li>);
});

const SortableItem = SortableElement((props: SortableItem) => {
  return (<DragHandleToolbar {...props} />);
});

const SortableList = SortableContainer(({ items }: SortableListProps) => {
  return (
    <ul className="sortable-list">
      {items.map((id, index) => (<SortableItem key={`item-${id}`} id={id} index={index} />))}
    </ul>
  );
});

export const ReactSortableHocList: React.FunctionComponent<{}> = () => {
  const [items, setItems] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  let containerRef = useRef<HTMLDivElement | null>(null);

  const onSortEnd = ({ oldIndex, newIndex }: OnSortEndProps) => {
    if (oldIndex !== newIndex) {
      setItems((items) => arrayMoveImmutable(items, oldIndex, newIndex));
    }
  };

  return (
    <div ref={(ref) => { containerRef.current = ref; }}>
      <SortableList
        items={items}
        onSortEnd={onSortEnd}
        useDragHandle
        transitionDuration={0}
        helperContainer={() => (containerRef.current ?? document.body)}
        helperClass="dragging-react-sortable-hoc"
        distance={10}
      />
    </div>
  );
}
