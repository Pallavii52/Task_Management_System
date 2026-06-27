import React, { useState, useEffect } from 'react';

const emptyTask = {
  title: '',
  description: '',
  assignedTo: '',
  priority: 'MEDIUM',
  status: 'PENDING',
  dueDate: '',
};

function TaskForm({ task, onSave, onCancel }) {
  const [formData, setFormData] = useState(emptyTask);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        assignedTo: task.assignedTo || '',
        priority: task.priority || 'MEDIUM',
        status: task.status || 'PENDING',
        dueDate: task.dueDate || '',
      });
    } else {
      setFormData(emptyTask);
    }
    setErrors({});
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.assignedTo.trim()) newErrors.assignedTo = 'Assigned To is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(formData.dueDate);
      if (selected < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...formData, id: task ? task.id : undefined });
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Assigned To *</label>
            <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} />
            {errors.assignedTo && <span className="error-text">{errors.assignedTo}</span>}
          </div>

          <div className="form-group">
            <label>Priority *</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date *</label>
            <input type="date" name="dueDate" min={todayStr} value={formData.dueDate} onChange={handleChange} />
            {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
