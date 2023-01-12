import type { UniqueIdentifier } from '@dnd-kit/core';

export type ToolbarProps = { id: number };

export type DragHandleToolbarProps = ToolbarProps & { activeId?: UniqueIdentifier };

export type SortableListProps = { items: number[]; };

export type SortableItem = { id: number; index: number; };

export type OnSortEndProps = {
  oldIndex: number;
  newIndex: number;
};
