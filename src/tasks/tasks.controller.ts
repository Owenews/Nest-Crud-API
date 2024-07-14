import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Query() query: ExpressQuery): Promise<Task[]> {
    return this.tasksService.findAll(query);
  }

  @Post()
  async createTask(
    @Body()
    task: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Task> {
    return this.tasksService.findById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id')
    id: string,
    @Body()
    task: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateById(id, task);
  }

  @Delete(':id')
  async deleteTask(
    @Param('id')
    id: string,
  ): Promise<Task> {
    return this.tasksService.deleteById(id);
  }
}
