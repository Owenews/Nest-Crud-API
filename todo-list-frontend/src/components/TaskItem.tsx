// /src/components/TaskItem.tsx

import React from 'react';
import { Task } from '../interfaces/Task';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteById } from '../services/taskService';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: () => void;
}

const TaskItemWrapper = styled.li`
  background-color: #fff;
  margin: 10px 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
  }

  .actions {
    display: flex;
    gap: 10px;
  }
`;

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const handleDelete = async () => {
    await deleteById(task.id);
    onDelete();
  };

  return (
    <TaskItemWrapper>
      <div>
        <h2>Title: {task.title}</h2>
        <p>Description: {task.description}</p>
        <p>Start: {new Date(task.startDate).toLocaleDateString()}</p>
        <p>End: {new Date(task.endDate).toLocaleDateString()}</p>
        <p>Responsible: {task.responsible}</p>
        <p>Status: {task.status}</p>
      </div>
      <div className="actions">
        <FaEdit onClick={() => onEdit(task)} />
        <FaTrash onClick={handleDelete} />
      </div>
    </TaskItemWrapper>
  );
};

export default TaskItem;
