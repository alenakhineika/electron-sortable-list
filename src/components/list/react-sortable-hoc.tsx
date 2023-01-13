import React, { useRef, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import type { SortableItem, SortableListProps, SortProps, SortableComponentProps } from './../../types';
import { DraggingHandle } from './../button/dragging-handle';

export const DraggableHandle = SortableHandle(() => (<DraggingHandle />));

const SortableItem = SortableElement(({ id, hasDraggHandle }: SortableItem) => (
  <li className="sortable-item">
    <span>Item {id}</span>
    <div className="dragging-handle-container">
      {hasDraggHandle ? <DraggableHandle /> : null}
    </div>
  </li>
));

const SortableList = SortableContainer(({ items, hasDraggHandle }: SortableListProps) => {
  return (
    <ul className="sortable-list">
      {items.map((id, index) => (
        <SortableItem key={`item-${id}`} id={id} index={index} hasDraggHandle={hasDraggHandle} />
      ))}
    </ul>
  );
});

export const ReactSortableHocList: React.FunctionComponent<SortableComponentProps> = ({
  hasDraggHandle,
}) => {
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
        // The useDragHandle is an internal property of SortableContainer
        // and can not be read by a child.
        // To make the value accessible,
        // we pass a duplicate value as hasDraggHandle.
        hasDraggHandle={hasDraggHandle}
        useDragHandle={hasDraggHandle}
      />
    </div>
  );
}
