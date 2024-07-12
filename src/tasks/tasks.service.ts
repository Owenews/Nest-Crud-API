import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async create(task: Task): Promise<Task> {
    const res = await this.taskModel.create(task);
    return res;
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }

  async updateById(id: string, task: Task): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
    });
  }

  async deleteById(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id);
  }
}


