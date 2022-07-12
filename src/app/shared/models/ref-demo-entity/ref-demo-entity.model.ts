import { BaseModel } from "@models";

export class RefDemoEntity extends BaseModel {
  libelle: string;
  code: string;
  actif: boolean;
  color: string;
  selectedObject: boolean;
  etablissement: any;
  date: any;
  radio: any;
  textarea: string;
  //list
  convention: any;
  //checkbox
  parametres: any[];
  timer: any;
  summernote: any;
  refDemoEntitysSelected: any[];
  add: boolean;
  id_: any; 
  checkSum: string;
  fileName: string;
  urlFile: string;
  constructor(id?: number) {
    super(id);
  }

  toString() {
    return JSON.stringify(this);
  }
}
