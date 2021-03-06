export class BaseModel {

  id: number;
  createdOn?: any;
  createdBy?: string;
  updatedOn?: Date;
  updatedBy?: string;
  label?: string;

  constructor(id?: number, label?: string) {
    this.id = id;
    this.label = label;
  }

  toString() {
    return JSON.stringify(this);
  }

}
