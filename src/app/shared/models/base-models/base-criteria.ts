export class BaseCriteria {

  id?: number;
  notId?: number;
  idsIn?: Array<number>;
  idsNotIn?: Array<number>;
  maxResults?: number;
  page?: number;
  orderByAsc?: Array<string>;
  orderByDesc?: Array<string>;
  sortField?: string;
  sortOrder?: string;
  filterName?: string;
  filterWord?: string;
  exportModel?: any;
  includes?: Array<string>;
  excludes?: Array<string>;
  tous: boolean;
  absent: boolean;
  present: boolean;

  constructor(order?: string, sortNameList?: Array<string>) {
    if (order != null && order === 'asc') {
      this.orderByAsc = sortNameList;
    } else if (order != null && order === 'desc') {
      this.orderByDesc = sortNameList;
    }
  }
}
