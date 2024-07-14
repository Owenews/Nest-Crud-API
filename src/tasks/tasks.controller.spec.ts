import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Status } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let taskService: TasksService;
  let taskController: TasksController;

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
    findAll: jest.fn().mockResolvedValueOnce([mockTask]),
    create: jest.fn(),
    findById: jest.fn().mockResolvedValueOnce(mockTask),
    updateById: jest.fn(),
    deleteById: jest.fn().mockResolvedValueOnce({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskController = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should get all tasks', async () => {
      const result = await taskController.getAllTasks({
        page: '1',
        keyword: 'test',
      });

      expect(taskService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockTask]);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newBook = {
        title: 'Créer une interface utilisateur',
        description:
          "Développer l'interface utilisateur avec React et TypeScript.",
        startDate: new Date(),
        endDate: new Date(),
        duration: 8,
        responsible: 'Tester',
        status: Status.TODO,
      };

      mockTaskService.create = jest.fn().mockResolvedValueOnce(mockTask);

      const result = await taskController.createTask(newBook as CreateTaskDto);

      expect(taskService.create).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });

  describe('getTask', () => {
    it('should get a task by ID', async () => {
      const result = await taskController.getTask(mockTask._id);

      expect(taskService.findById).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });

  describe('updateTask', () => {
    it('should update task by its ID', async () => {
      const updatedBook = { ...mockTask, title: 'Updated name' };
      const book = { title: 'Updated name' };

      mockTaskService.updateById = jest.fn().mockResolvedValueOnce(updatedBook);

      const result = await taskController.updateTask(
        mockTask._id,
        book as UpdateTaskDto,
      );

      expect(taskService.updateById).toHaveBeenCalled();
      expect(result).toEqual(updatedBook);
    });
  });

  describe('deletetask', () => {
    it('should delete a task by ID', async () => {
      const result = await taskController.deleteTask(mockTask._id);

      expect(taskService.deleteById).toHaveBeenCalled();
      expect(result).toEqual({ deleted: true });
    });
  });
});
