import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Status {
  TODO = 'to do',
  INPROGRESS = 'in progress',
  DONE = 'done',
}

@Schema()
export class Task {
  @Prop({ required: true })
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
