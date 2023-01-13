import React, { useCallback, useState } from 'react';
import { arrayMoveImmutable } from 'array-move';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS as cssDndKit } from '@dnd-kit/utilities';
import type { SortableItemProps, SortableListProps, SortableComponentProps } from './../../types';

function SortableItem({ id, activeId }: SortableItemProps) {
  const { setNodeRef, transform, transition, listeners } = useSortable({ id });
  const style = {
    transform: cssDndKit.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      className={(activeId === id) ? 'sortable-item dragging-dbd-kit' : 'sortable-item'}
    >
      <span>Item {id - 1}</span>
    </li>
  );
}

const SortableList = ({ items, onSortEnd }: SortableListProps) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const getIndex = (id: UniqueIdentifier) => items.indexOf(+id);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating.
      // Slight distance prevents sortable logic messing with
      // interactive elements in the handler toolbar component.
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement.
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      autoScroll={false}
      onDragStart={({ active }) => {
        if (active) {
          setActiveId(active.id);
        }
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          onSortEnd({
            oldIndex: getIndex(active.id),
            newIndex: getIndex(over.id),
          });
        }
        setActiveId(null);
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="sortable-list">
          {items.map((id, index) => (
            <SortableItem key={`item-${id}`} id={id} activeId={activeId} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export const DndKitList: React.FunctionComponent<SortableComponentProps> = () => {
  // The SortableContext unique identifiers
  // must be strings or numbers bigger than 0.
  const [items, setItems] = useState<number[]>(
    () => [0, 1, 2, 3, 4, 5].map((id) => id + 1)
  );
  
  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      setItems((items) => arrayMoveImmutable(items, oldIndex, newIndex));
    },
    [items]
  );

  return (<SortableList items={items} onSortEnd={onSortEnd} />);
}
