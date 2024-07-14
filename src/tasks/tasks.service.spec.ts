import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task, Status } from './schemas/task.schema';
import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksService', () => {
  let taskService: TasksService;
  let model: Model<Task>;

  const mockTask = {
    _id: '61c0ccf11d7bf83d153d7c06',
    title: 'Créer une interface utilisateur',
    description: "Développer l'interface utilisateur avec React et TypeScript.",
    startDate: new Date(),
    endDate: new Date(),
    duration: 8,
    responsible: 'Tester',
    status: Status.TODO,
  };

  const mockTaskService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskService,
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const query = { page: '1', keyword: 'test' };

      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockTask]),
            }),
          }) as any,
      );

      const result = await taskService.findAll(query);

      expect(model.find).toHaveBeenCalledWith({
        title: { $regex: 'test', $options: 'i' },
      });

      expect(result).toEqual([mockTask]);
    });
  });

  /*
  describe('create', () => {
    it('should create and return a task', async () => {
      const newTask = {
        title: 'Développer une API pour les tâches',
        description: 'Implémenter les endpoints CRUD pour les tâches.',
        startDate: new Date(),
        endDate: new Date(),
        duration: 5,
        responsible: 'Tester',
        status: Status.TODO,
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockTask));

      const result = await taskService.create(newTask as CreateTaskDto);

      expect(result).toEqual(mockTask);
    });
  });
  */

  describe('findById', () => {
    it('should find and return a book by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockTask);

      const result = await taskService.findById(mockTask._id);

      expect(model.findById).toHaveBeenCalledWith(mockTask._id);
      expect(result).toEqual(mockTask);
    });

    it('should throw BadRequestException if invalid ID is provided', async () => {
      const id = 'invalid-id';

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(taskService.findById(id)).rejects.toThrow(
        BadRequestException,
      );

      expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
      isValidObjectIDMock.mockRestore();
    });

    it('should throw NotFoundException if book is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(taskService.findById(mockTask._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findById).toHaveBeenCalledWith(mockTask._id);
    });
  });

  describe('updateById', () => {
    it('should update and return a book', async () => {
      const updatedBook = { ...mockTask, title: 'Updated name' };
      const book = { title: 'Updated name' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedBook);

      const result = await taskService.updateById(mockTask._id, book as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockTask._id, book, {
        new: true,
        runValidators: true,
      });

      expect(result.title).toEqual(book.title);
    });
  });

  describe('deleteById', () => {
    it('should delete and return a task', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockTask);

      const result = await taskService.deleteById(mockTask._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockTask._id);

      expect(result).toEqual(mockTask);
    });
  });
});
