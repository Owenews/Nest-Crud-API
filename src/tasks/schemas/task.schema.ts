import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Status {
  TODO = 'To do',
  INPROGRESS = 'In progress',
  DONE = 'Done',
}

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  duration: number;

  @Prop()
  responsible: string;

  @Prop()
  status: Status;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
