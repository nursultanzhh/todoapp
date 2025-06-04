import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  toggleDone,
  moveToTrash,
  restoreTask,
  deleteForever,
  currentTab
}) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          done={todo.done}
          trash={todo.trash}
          onToggle={() => toggleDone(todo.id)}
          onTrash={() => moveToTrash(todo.id)}
          onRestore={() => restoreTask(todo.id)}
          onDelete={() => deleteForever(todo.id)}
          isTrashTab={currentTab === 'trash'}
        />
      ))}
    </ul>
  );
};

export default TodoList;
