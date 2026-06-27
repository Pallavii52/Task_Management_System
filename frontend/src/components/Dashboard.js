import React from 'react';

function Dashboard({ stats }) {
  const cards = [
    { label: 'Total Tasks', value: stats.totalTasks, className: 'card-total' },
    { label: 'Pending Tasks', value: stats.pendingTasks, className: 'card-pending' },
    { label: 'In Progress Tasks', value: stats.inProgressTasks, className: 'card-progress' },
    { label: 'Completed Tasks', value: stats.completedTasks, className: 'card-completed' },
  ];

  return (
    <div className="dashboard">
      {cards.map((card) => (
        <div className={`dashboard-card ${card.className}`} key={card.label}>
          <h3>{card.value}</h3>
          <p>{card.label}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
