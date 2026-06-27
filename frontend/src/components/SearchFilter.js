import React from 'react';

function SearchFilter({ filters, onFilterChange, onSearch, onReset }) {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        name="title"
        placeholder="Search by Task Title"
        value={filters.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="assignedTo"
        placeholder="Search by Assigned To"
        value={filters.assignedTo}
        onChange={handleChange}
      />
      <select name="priority" value={filters.priority} onChange={handleChange}>
        <option value="">All Priorities</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">All Statuses</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <button onClick={onSearch} className="btn btn-primary">Search</button>
      <button onClick={onReset} className="btn btn-secondary">Reset</button>
    </div>
  );
}

export default SearchFilter;
