import request from 'supertest';
import express from 'express';
import { Schema, model, connect, connection } from 'mongoose';
import { json } from 'body-parser';
import { MongoMemoryServer } from 'mongodb-memory-server';

const app = express();
app.use(json());

const Status = {
  TODO: 'to do',
  INPROGRESS: 'in progress',
  DONE: 'done',
};

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  duration: { type: Number },
  responsible: { type: String },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.TODO,
    required: true,
  },
});

const Task = model('Task', taskSchema);

// Routes de l'API
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await connection.dropDatabase();
  await connection.close();
  await mongoServer.stop();
});

describe('Tasks API', () => {
  it('should create a new task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'Test Description',
      startDate: '2024-07-01',
      endDate: '2024-07-02',
      duration: 2,
      responsible: 'Owen Boss',
      status: Status.TODO,
    };
    const res = await request(app).post('/tasks').send(newTask);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(newTask.title);
  });

  it('should fetch all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should update a task', async () => {
    const task = new Task({
      title: 'Task to Update',
      description: 'Description',
      startDate: '2024-07-01',
      endDate: '2024-07-02',
      duration: 2,
      responsible: 'Owen Boss',
      status: Status.TODO,
    });
    await task.save();

    const updatedTask = {
      title: 'Updated Task',
      description: 'Updated Description',
      startDate: '2024-07-01',
      endDate: '2024-07-02',
      duration: 3,
      responsible: 'James Boss',
      status: Status.INPROGRESS,
    };

    const res = await request(app).put(`/tasks/${task._id}`).send(updatedTask);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe(updatedTask.title);
    expect(res.body.description).toBe(updatedTask.description);
  });

  it('should delete a task', async () => {
    const task = new Task({
      title: 'Task to Delete',
      description: 'Description',
      startDate: '2024-07-01',
      endDate: '2024-07-02',
      duration: 2,
      responsible: 'Owen Boss',
      status: Status.TODO,
    });
    await task.save();

    const res = await request(app).delete(`/tasks/${task._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Task deleted');
  });
});
