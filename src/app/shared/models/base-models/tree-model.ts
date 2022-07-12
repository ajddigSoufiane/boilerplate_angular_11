export class TreeModel {

  id: number;
  name: string;
  objectId: number;
  objectType: string;
  label: string;
  parentId: number;
  checked: boolean;
  indeterminate: boolean;
  children: any[];

  constructor(id?: number) {
    this.id = id;
  }

  toString() {
    return JSON.stringify(this);
  }

}
