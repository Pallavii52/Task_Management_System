import React, { useState, useEffect, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import SearchFilter from './components/SearchFilter';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import taskService from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
  });
  const [filters, setFilters] = useState({ title: '', assignedTo: '', priority: '', status: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');

  const loadStats = useCallback(async () => {
    try {
      const res = await taskService.getDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.error('Failed to load dashboard stats', err);
    }
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      const res = await taskService.getAllTasks();
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to load tasks', err);
    }
  }, []);

  useEffect(() => {
    loadTasks();
    loadStats();
  }, [loadTasks, loadStats]);

  const handleSearch = async () => {
    try {
      const res = await taskService.searchAndFilter(filters);
      setTasks(res.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  const handleReset = async () => {
    setFilters({ title: '', assignedTo: '', priority: '', status: '' });
    await loadTasks();
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
    setError('');
  };

  const handleSave = async (taskData) => {
    try {
      if (taskData.id) {
        await taskService.updateTask(taskData.id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      setShowForm(false);
      setEditingTask(null);
      await loadTasks();
      await loadStats();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        await loadTasks();
        await loadStats();
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await taskService.updateStatus(id, status);
      await loadTasks();
      await loadStats();
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Management System</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>+ Add New Task</button>
      </header>

      <Dashboard stats={stats} />

      <SearchFilter
        filters={filters}
        onFilterChange={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {error && <p className="error-text">{error}</p>}

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
}

export default App;
