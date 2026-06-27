import React from 'react';

function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (!tasks.length) {
    return <p className="no-tasks">No tasks found.</p>;
  }

  const priorityClass = (priority) => `badge badge-${priority.toLowerCase()}`;
  const statusClass = (status) => `badge badge-${status.toLowerCase().replace('_', '-')}`;

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Assigned To</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.assignedTo}</td>
            <td><span className={priorityClass(task.priority)}>{task.priority}</span></td>
            <td>
              <select
                className={statusClass(task.status)}
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </td>
            <td>{task.dueDate}</td>
            <td>
              <button className="btn btn-edit" onClick={() => onEdit(task)}>Edit</button>
              <button className="btn btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
