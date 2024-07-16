import React, { useState, useEffect } from 'react';
import { Task } from '../interfaces/Task';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { findAll, create, updateById, deleteById } from '../service/taskService';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await findAll();
      setTasks(tasks);
    };
    loadTasks();
  }, []);

  const handleSave = async (task: Task) => {
    if (task.id) {
      const updatedTask = await updateById(task.id);
      setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
    } else {
      const newTask = await create(task);
      setTasks([...tasks, newTask]);
    }
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = async (id: string) => {
    await deleteById(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleStatusChange = async (id: string, status: string) => {
    const updatedTask = await updateById(id);
    setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
  };

  return (
    <div>
      <h1>Task List</h1>
      <button onClick={() => setEditingTask({} as Task)}>Add Task</button>
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onCancel={() => setEditingTask(null)}
        />
      )}
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

// Ajout d'une déclaration d'exportation vide pour résoudre l'erreur TS1208
export {};

