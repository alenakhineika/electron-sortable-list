import React, { useRef, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import type { SortableItem, SortableListProps, SortProps } from './../../types';

const SortableItem = SortableElement(({ id }: SortableItem) => {
  return (<li className="sortable-item">Item {id}</li>);
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

  const onSortEnd = ({ oldIndex, newIndex }: SortProps) => {
    setItems((items) => arrayMoveImmutable(items, oldIndex, newIndex));
  };

  return (
    <div ref={(ref) => { containerRef.current = ref; }}>
      <SortableList
        items={items}
        onSortEnd={onSortEnd}
        transitionDuration={0}
        helperContainer={() => (containerRef.current ?? document.body)}
        helperClass="dragging-react-sortable-hoc"
        distance={10}
      />
    </div>
  );
}
