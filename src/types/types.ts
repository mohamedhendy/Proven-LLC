export interface ObjectData {
  _id: string;
  name: string;
  boxes: Box[];
  base64: string;
}

export interface Box {
  points: number[];
  text: string;
  class: ClassType | string;
}

export enum ClassType {
  Name = 'Name',
  Description = 'Description',
  Date = 'Date',
  Amount = 'Amount',
  Supplier = 'Supplier',
  Number = 'Number',
}