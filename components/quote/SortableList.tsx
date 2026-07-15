"use client";

import React from "react";
import {
  DndContext,
  type DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  onRemove?: () => void;
  onEdit?: () => void;
}

export function SortableItem({ id, children, onRemove, onEdit }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-2 bg-background border rounded-md mb-2 shadow-sm group">
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground outline-none">
        <GripVertical className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        {children}
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onEdit && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
        {onRemove && (
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

interface SortableListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  onReorder: (newItems: T[]) => void;
  onRemove?: (index: number) => void;
  onEdit?: (index: number) => void;
}

export function SortableList<T>({ items, renderItem, keyExtractor, onReorder, onRemove, onEdit }: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item, idx) => keyExtractor(item, idx) === active.id);
      const newIndex = items.findIndex((item, idx) => keyExtractor(item, idx) === over.id);
      
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item, idx) => keyExtractor(item, idx))} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {items.map((item, index) => {
            const key = keyExtractor(item, index);
            return (
              <SortableItem 
                key={key} 
                id={key} 
                onRemove={onRemove ? () => onRemove(index) : undefined}
                onEdit={onEdit ? () => onEdit(index) : undefined}
              >
                {renderItem(item, index)}
              </SortableItem>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
