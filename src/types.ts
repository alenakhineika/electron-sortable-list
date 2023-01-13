import type { UniqueIdentifier } from '@dnd-kit/core';

export type ToolbarProps = { id: number };

export type SortableItemProps = ToolbarProps & {
  activeId?: UniqueIdentifier;
  hasDraggHandle?: boolean;
};

export type SortProps = { oldIndex: number; newIndex: number };

export type SortableListProps = {
  items: number[];
  onSortEnd: (props: SortProps) => void;
  hasDraggHandle?: boolean;
};

export type SortableItem = { id: number; index: number; hasDraggHandle?: boolean };

export type SortableComponentProps = { hasDraggHandle?: boolean };

export type DraggableHandleProps = { handleListeners: Record<string, Function> };
