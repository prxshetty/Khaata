import * as React from 'react';

const RecentActivity: React.FC = () => {
  const activities = [
    { id: 1, description: 'Paid $50 for dinner', date: '2023-10-01' },
    { id: 2, description: 'Received $30 from John', date: '2023-10-02' },
    { id: 3, description: 'Paid $20 for groceries', date: '2023-10-03' },
    { id: 4, description: 'Received $10 from Jane', date: '2023-10-04' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-green-600 mb-6">Recent Activity</h2>
      <ul className="space-y-4">
        {activities.map(activity => (
          <li key={activity.id} className="flex justify-between">
            <span className="text-gray-600">{activity.description}</span>
            <span className="text-gray-400">{activity.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;