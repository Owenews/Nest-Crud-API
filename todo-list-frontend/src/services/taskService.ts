// /src/services/taskService.ts

import { Task } from '../interfaces/Task';

export const findAll = async (): Promise<Task[]> => {
  const response = await fetch('/http://localhost:3000/tasks');
  return response.json();
};

export const create = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch('/http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });
  return response.json();
};

export const updateById = async (task: Task): Promise<Task> => {
  const response = await fetch(`/http://localhost:3000/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });
  return response.json();
};

export const deleteById = async (id: string): Promise<void> => {
  await fetch(`/http://localhost:3000/tasks/${id}`, {
    method: 'DELETE'
  });
};
