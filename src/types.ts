import type { UniqueIdentifier } from '@dnd-kit/core';

export type ToolbarProps = { id: number };

export type SortableItemProps = ToolbarProps & { activeId?: UniqueIdentifier };

export type SortProps = { oldIndex: number; newIndex: number };

export type SortableListProps = { items: number[]; onSortEnd: (props: SortProps) => void };

export type SortableItem = { id: number; index: number };
