import { Status } from '../schemas/task.schema';

export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly duration: number;
  readonly responsible: string;
  readonly status: Status;
}