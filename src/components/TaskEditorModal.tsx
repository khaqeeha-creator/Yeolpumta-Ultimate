import React, { useState } from 'react';
import { Task } from '@/types';
import { X, Save } from 'lucide-react';

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export const TaskEditorModal: React.FC<Props> = ({ task, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [estimate, setEstimate] = useState(task?.estimateMin || 30);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      onSave({ ...task, title, estimateMin: estimate });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-ultimate-panel border border-ultimate-border w-full max-w-md rounded-xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Edit Quest</h2>
          <button onClick={onClose} className="text-ultimate-dim hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-ultimate-dim mb-1">Title</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/20 border border-ultimate-border rounded p-2 text-white focus:border-ultimate-accent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase text-ultimate-dim mb-1">Estimate (min)</label>
            <input 
              type="number"
              value={estimate}
              onChange={(e) => setEstimate(Number(e.target.value))}
              className="w-full bg-black/20 border border-ultimate-border rounded p-2 text-white focus:border-ultimate-accent outline-none"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-ultimate-accent hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditorModal;