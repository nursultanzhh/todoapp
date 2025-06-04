import React, { useState } from 'react';
import TrashIcon from '../assets/TrashIcon.svg';
import CheckIcon from '../assets/Library add check.svg';

const TodoItem = ({ text, done, trash, onToggle, onTrash, onRestore, onDelete, isTrashTab }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <li className={`flex items-center gap-2 px-2 py-2 rounded-md relative ${done ? 'bg-gray-100' : ''}`}>
      <div className="relative">
        <button
          className="text-gray-500 hover:text-black text-lg"
          onClick={() => setShowMenu(!showMenu)}
        >
          ⋮
        </button>
        {showMenu && (
          <div className="absolute top-6 left-0 bg-gray-100 rounded-xl p-1 w-50 z-10 space-y-1">
            {isTrashTab ? (
              <>
                <button onClick={onDelete} className="w-full text-left flex items-center gap-2 text-sm hover:bg-gray-200 p-1 rounded"><img src={TrashIcon} className="w-4 h-4" /> Delete Forever</button>
                <button onClick={onRestore} className="w-full text-left flex items-center gap-2 text-sm hover:bg-gray-200 p-1 rounded"><img src={CheckIcon} className="w-4 h-4" /> Move back to ToDo</button>
              </>
            ) : (
              <button onClick={onTrash} className="w-full text-left flex items-center gap-2 text-sm hover:bg-gray-200 p-1 rounded"><img src={TrashIcon} className="w-4 h-4" /> Move to Trash</button>
            )}
          </div>
        )}
      </div>

      {!trash && (
        <label className="relative flex items-center justify-center w-4 h-4">
          <input type="checkbox" className="peer hidden" checked={done} onChange={onToggle} />
          <div className="w-4 h-4 border-2 border-gray-400 rounded peer-checked:bg-purple-600 peer-checked:border-purple-600" />
          <svg className="w-3 h-3 text-white absolute hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </label>
      )}

      <span className={`text-sm ${done ? 'line-through text-gray-400' : 'text-black'}`}>
        {text}
      </span>
    </li>
  );
};

export default TodoItem;
