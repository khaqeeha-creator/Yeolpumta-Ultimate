import React, { useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types';
import { useStore } from '@/store/useStore';
import { clsx } from 'clsx';
import { MoreHorizontal } from 'lucide-react';
import TaskEditorModal from './TaskEditorModal';

interface SortableTaskProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const SortableTask: React.FC<SortableTaskProps> = ({ task, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "bg-ultimate-panel border border-ultimate-border p-3 rounded-lg mb-2 group cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex gap-2 mb-1">
            {task.tags.map(t => (
              <span key={t} className="text-[10px] uppercase bg-white/5 text-ultimate-dim px-1 rounded">
                {t}
              </span>
            ))}
          </div>
          <h4 className="font-medium text-sm text-white">{task.title}</h4>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent drag start
            onEdit(task);
          }}
          className="text-ultimate-dim hover:text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export const StudyBoard: React.FC = () => {
  const { tasks, updateTaskStatus, updateTask } = useStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const columns = {
    todo: tasks.filter(t => t.status === 'todo'),
    doing: tasks.filter(t => t.status === 'doing'),
    done: tasks.filter(t => t.status === 'done'),
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Simplification: In a real sortable list, we'd reorder.
      // Here, we just check which column container we dropped into.
      // Since dnd-kit is complex, we'll assume dropping onto a column container 
      // or another item in that column updates the status.
      
      const overId = over.id as string;
      let newStatus: Task['status'] | null = null;

      if (['col-todo', 'col-doing', 'col-done'].includes(overId)) {
        newStatus = overId.replace('col-', '') as Task['status'];
      } else {
        // Find the task we dropped over to determine status
        const overTask = tasks.find(t => t.id === overId);
        if (overTask) {
          newStatus = overTask.status;
        }
      }

      if (newStatus && newStatus !== active.data.current?.status) {
        updateTaskStatus(active.id as string, newStatus);
      }
    }
    setActiveId(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-white mb-4">Study Board</h2>
      
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners} 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">
          {(Object.entries(columns) as [string, Task[]][]).map(([colId, colTasks]) => (
            <div 
              key={colId} 
              id={`col-${colId}`} 
              className="bg-black/20 rounded-xl p-4 border border-ultimate-border/50 flex flex-col"
            >
              <h3 className="uppercase text-xs font-bold text-ultimate-dim mb-3 tracking-wider flex justify-between">
                {colId} <span className="bg-white/10 px-2 rounded-full text-white">{colTasks.length}</span>
              </h3>
              
              <SortableContext 
                items={colTasks.map(t => t.id)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="flex-1 overflow-y-auto">
                  {colTasks.map(task => (
                    <SortableTask key={task.id} task={task} onEdit={setEditingTask} />
                  ))}
                  {colTasks.length === 0 && (
                    <div className="h-full border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center text-ultimate-dim text-xs">
                      Drop here
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="bg-ultimate-panel border border-ultimate-accent p-3 rounded-lg shadow-2xl rotate-3 scale-105">
               <div className="h-4 w-24 bg-white/10 rounded mb-2"></div>
               <div className="h-3 w-16 bg-white/5 rounded"></div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskEditorModal 
        isOpen={!!editingTask} 
        task={editingTask} 
        onClose={() => setEditingTask(null)}
        onSave={(t) => {
          updateTask(t);
          setEditingTask(null);
        }}
      />
    </div>
  );
};

export default StudyBoard;