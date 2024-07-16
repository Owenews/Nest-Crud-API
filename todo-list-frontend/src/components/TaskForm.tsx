// /src/components/TaskForm.tsx

import React, { useState } from 'react';
import { Task, Status } from '../interfaces/Task';
import { create, updateById } from '../services/taskService';
import styled from 'styled-components';

interface TaskFormProps {
  task?: Task;
  onSubmit: () => void;
}

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {
  const [formData, setFormData] = useState<Task>({
    id: task?.id || '',
    title: task?.title || '',
    description: task?.description || '',
    startDate: task?.startDate || new Date(),
    endDate: task?.endDate || new Date(),
    duration: task?.duration || 0,
    responsible: task?.responsible || '',
    status: task?.status || Status.TODO,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'startDate' || name === 'endDate' ? new Date(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      await updateById(formData);
    } else {
      await create(formData);
    }
    onSubmit();
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input name="startDate" type="date" value={formData.startDate.toISOString().split('T')[0]} onChange={handleChange} required />
        <input name="endDate" type="date" value={formData.endDate.toISOString().split('T')[0]} onChange={handleChange} required />
        <input name="duration" type="number" value={formData.duration} onChange={handleChange} placeholder="Duration" required />
        <input name="responsible" value={formData.responsible} onChange={handleChange} placeholder="Responsible" required />
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value={Status.TODO}>{Status.TODO}</option>
          <option value={Status.INPROGRESS}>{Status.INPROGRESS}</option>
          <option value={Status.DONE}>{Status.DONE}</option>
        </select>
        <button type="submit">Save Task</button>
      </form>
    </FormWrapper>
  );
};

export default TaskForm;
