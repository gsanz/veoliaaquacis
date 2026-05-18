// src/components/TaskCard.jsx
export default function TaskCard({ task }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '10px',
      marginBottom: '10px'
    }}>
      <h3>{task.title}</h3>
      <p>{task.responsible}</p>
      <p>{task.completed ? '✔ Done' : '⏳ Pending'}</p>
    </div>
  );
}
