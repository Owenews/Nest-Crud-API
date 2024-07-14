import { Status } from '../schemas/task.schema';
import {
  IsEnum,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsDate()
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  readonly endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;

  @IsNotEmpty()
  @IsString()
  readonly responsible: string;

  @IsNotEmpty()
  @IsEnum(Status, { message: 'Please enter the correct status.' })
  readonly status: Status;
}
