import type { UniqueIdentifier } from '@dnd-kit/core';

export type ToolbarProps = { id: number };

export type SortableItemProps = ToolbarProps & { activeId?: UniqueIdentifier };

export type SortableListProps = {
  items: number[];
  onSortEnd: (props: { oldIndex: number, newIndex: number}) => void };

export type SortableItem = { id: number; index: number; };

export type OnSortEndProps = {
  oldIndex: number;
  newIndex: number;
};
