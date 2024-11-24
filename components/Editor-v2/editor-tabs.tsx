"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface EditorTab {
  id: string;
  name: string;
  content: string;
}

interface EditorTabsProps {
  tabs: EditorTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  onTabClose: (id: string) => void;
  onTabsReorder: (tabs: EditorTab[]) => void;
}

interface SortableTabProps {
  tab: EditorTab;
  isActive: boolean;
  onClose: () => void;
  onClick: () => void;
}

function SortableTab({ tab, isActive, onClose, onClick }: SortableTabProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group flex items-center h-9 px-4 border-r border-[#323232] cursor-pointer hover:bg-[#2D2D2D] select-none transition-all duration-200",
        "relative overflow-hidden",
        isActive && [
          "bg-[#1E1E1E]",
          "border-t-2 border-t-[#007ACC]",
          "before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-[#007ACC]",
          "before:transform before:translate-x-0",
          "before:transition-transform before:duration-200",
        ],
        !isActive && [
          "before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-[#007ACC]",
          "before:transform before:translate-x-[-100%]",
          "hover:before:translate-x-0",
          "before:transition-transform before:duration-200",
        ],
        isDragging && "opacity-50 scale-105 rotate-2"
      )}
      onClick={onClick}
    >
      <span className="text-sm text-[#CCCCCC] mr-2 transition-transform duration-200 group-hover:translate-x-0.5">
        {tab.name}
      </span>
      <button
        className={cn(
          "opacity-0 group-hover:opacity-100 hover:bg-[#323232] rounded p-0.5",
          "transition-all duration-200 ease-in-out",
          "transform group-hover:rotate-0 rotate-90",
          "hover:scale-110"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-4 w-4 text-[#CCCCCC]" />
      </button>
    </div>
  );
}

export default function EditorTabs({
  tabs,
  activeTab,
  onTabChange,
  onTabClose,
  onTabsReorder,
}: EditorTabsProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
      const newIndex = tabs.findIndex((tab) => tab.id === over.id);

      const newTabs = [...tabs];
      const [movedTab] = newTabs.splice(oldIndex, 1);
      newTabs.splice(newIndex, 0, movedTab);

      onTabsReorder(newTabs);
    }
  };

  return (
    <div className="flex bg-[#252526] border-b border-[#323232] overflow-x-auto">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={tabs} strategy={horizontalListSortingStrategy}>
          {tabs.map((tab) => (
            <SortableTab
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClose={() => onTabClose(tab.id)}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}