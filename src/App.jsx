import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete React Assignment', completed: false, date: new Date().toLocaleString() },
    { id: 2, text: 'Prepare for presentation', completed: false, date: new Date().toLocaleString() }
  ])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)

  const handleAdd = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    if (editingId) {
      setTodos(todos.map(t => t.id === editingId ? { ...t, text: input } : t))
      setEditingId(null)
    } else {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false,
        date: new Date().toLocaleString()
      }
      setTodos([newTodo, ...todos])
    }
    setInput('')
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const handleEdit = (todo) => {
    setInput(todo.text)
    setEditingId(todo.id)
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const filteredTodos = todos.filter(t => 
    t.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <div className="todo-container">
        <div className="header">
          <h1>My Todo</h1>
          <p>{new Date().toDateString()} • {todos.filter(t => !t.completed).length} tasks left</p>
        </div>

        <form className="input-box" onSubmit={handleAdd}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you need to do?"
          />
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        </form>

        <div className="search-box">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
          />
        </div>

        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty">No tasks found</li>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <div className="left" onClick={() => toggleComplete(todo.id)}>
                  <div className="check">{todo.completed ? '✓' : ''}</div>
                  <div>
                    <span className="text">{todo.text}</span>
                    <span className="date">{todo.date}</span>
                  </div>
                </div>
                <div className="actions">
                  <button className="edit-btn" onClick={() => handleEdit(todo)}>Edit</button>
                  <button className="del-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default App