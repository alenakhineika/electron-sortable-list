import React, { useCallback, useState } from 'react';
import { arrayMoveImmutable } from 'array-move';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS as cssDndKit } from '@dnd-kit/utilities';
import type { DragHandleToolbarProps } from './../../types';

function DragHandleToolbar({ id, activeId }: DragHandleToolbarProps) {
  const { setNodeRef, transform, transition, listeners } = useSortable({ id });
  const style = {
    transform: cssDndKit.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={(activeId === id) ? 'sortable-item dragging-dbd-kit' : 'sortable-item'}
      {...listeners}
    >
      Item {id - 1}
    </li>
  );
}

export const DndKitList: React.FunctionComponent<{}> = () => {
  // SortableContext provides a sorted array of the unique identifiers
  // associated with the elements that are used by the useSortable hook.
  // They must be strings or numbers bigger than 0.
  // It's important that the items prop passed to SortableContext
  // be sorted in the same order in which the items are rendered.
  const [items, setItems] = useState<number[]>(
    () => [0, 1, 2, 3, 4, 5].map((id) => id + 1)
  );
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

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      setItems((items) => arrayMoveImmutable(items, oldIndex, newIndex));
    },
    [items]
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
            <DragHandleToolbar key={`item-${id}`} id={id} activeId={activeId} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
