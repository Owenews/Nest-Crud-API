// /src/interfaces/Task.ts

export enum Status {
  TODO = 'To do',
  INPROGRESS = 'In progress',
  DONE = 'Done',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  responsible: string;
  status: Status;
}
