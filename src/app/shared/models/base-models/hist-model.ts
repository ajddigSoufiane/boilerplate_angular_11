export class HistModel {

  colonne: string;
  oldValue: string;
  oldValueFormat: string;
  newValue: string;
  newValueFormat: string;
  userId: number;
  username: string;
  typeaction: string;
  objectId: number;
  date: Date;

  constructor() {
  }

  toString() {
    return JSON.stringify(this);
  }

}
