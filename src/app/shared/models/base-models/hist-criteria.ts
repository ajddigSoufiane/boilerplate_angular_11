import { BaseCriteria } from './base-criteria';

export class HistCriteria extends BaseCriteria {

  colonne: string;
  oldValue: string;
  oldValueFormat: string;
  oldValueFormatLike: string;
  newValue: string;
  newValueFormat: string;
  newValueFormatLike: string;
  userId: number;
  username: string;
  usernameLike: string;
  typeaction: string;
  objectId: number;
  date: string;
  dateFrom: string;
  dateTo: string;
  typeactionIn: Array<string>;
  typeactionNotIn: Array<string>;


  constructor() {
    super();
  }

  toString() {
    return JSON.stringify(this);
  }

}
