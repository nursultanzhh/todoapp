import React, { useState } from 'react';
import TodoList from './components/TodoList';
import BottomBar from './components/bottombar';

const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([
    { id: '1', text: 'Write Essay', done: false, trash: false },
    { id: '2', text: 'One Hour CSS Course Online', done: false, trash: false },
    { id: '3', text: 'Buy One Way Tickets to San Fransico', done: false, trash: false },
    { id: '4', text: 'Go to Gym', done: false, trash: false },
    { id: '5', text: 'Buy Groceries', done: false, trash: false },
  ]);
  const [tab, setTab] = useState('todo');
  const [menubar, setMenuBar] = useState(false);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: input.trim(),
        done: false,
        trash: false
      }]);
      setInput('');
      setMenuBar(false);
    }
  };

  const toggleDone = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updated);
  };

  const moveToTrash = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, trash: true } : todo
    );
    setTodos(updated);
  };

  const restoreTask = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, trash: false } : todo
    );
    setTodos(updated);
  };

  const deleteForever = (id) => {
  const updated = todos.reduce((acc, todo) => {
    if (todo.id !== id) acc.push(todo);
    return acc;
  }, []);
  setTodos(updated);
};


  const filteredTodos = todos.reduce((acc, todo) => {
  if (tab === 'todo' && !todo.trash) acc.push(todo);
  else if (tab === 'done' && todo.done && !todo.trash) acc.push(todo);
  else if (tab === 'trash' && todo.trash) acc.push(todo);
  return acc;
}, []);

  return (
    <div className="flex">
      <div className="w-3/4 p-6 space-y-4">
        <h1 className="text-2xl font-bold">Simple To Do List</h1>
        <p className="text-gray-600">Today is awesome day. The weather is awesome, you are awesome too!</p>

        <div className="flex gap-2 mb-4 pt-20">
          <button onClick={() => setTab('todo')} className={`rounded-full px-4 py-1 ${tab === 'todo' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}>To Do</button>
          <button onClick={() => setTab('done')} className={`rounded-full px-4 py-1 ${tab === 'done' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}>Done</button>
          <button onClick={() => setTab('trash')} className={`rounded-full px-4 py-1 ${tab === 'trash' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}>Trash</button>
        </div>

        <div className='border-b-2 border-gray-300 pb-4'>
          <p className="text-xl font-bold pt-6">To Do</p>
        </div>

        <TodoList
          todos={filteredTodos}
          toggleDone={toggleDone}
          moveToTrash={moveToTrash}
          restoreTask={restoreTask}
          deleteForever={deleteForever}
          currentTab={tab}
        />
      </div>

      <div className="pt-50">
        {menubar && (
          <div className="bg-gray-100 p-4 rounded-md mb-2">
            <h4 className="font-semibold mb-2">Add New To Do</h4>
            <textarea
              placeholder="Your task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 bg-white rounded mb-2"
            />
            <button onClick={addTodo} className="bg-slate-800 text-white rounded-2xl px-4 py-1">Add</button>
          </div>
        )}
        <button onClick={() => setMenuBar(!menubar)} className="bg-slate-800 text-white text-xl rounded-full w-10 h-10 flex items-center justify-center">+</button>
      </div>

      <div className="fixed bottom-1 w-full">
        <BottomBar />
      </div>
    </div>
  );
};

export default App;
