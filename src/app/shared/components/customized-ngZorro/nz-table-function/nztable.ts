import { FormGroup } from "@angular/forms";
import { PaginatedList } from "@app/shared/models";
import { BaseComponent } from "../../base-component";
 
 

export abstract class nzTableFunction<TypeRef> extends BaseComponent { 
    public nzTotalItem: number;
    public nzRowsItem;
    public nzFirstItem;
    public nzSortFieldItem;
    public nzSortOrderItem;
    public collapsedInfo = false;
    public nzListTagCritier: any[];
    public nzItemList: Array<any>;
    public nzSelectedList: any[];
    public nzPaginatedItemList: PaginatedList; 

    loading =false

    name_function_load_str:string
    component:any
    field_searching_str:string
    //stander filter
    filterActif = [
      { text: 'Oui', value: true },
      { text: 'Non', value: false }
    ];
    constructor(private typeRef: new () => TypeRef, name_function_load_str:string,field_searching_str:string){ 
      super()
      this.name_function_load_str= name_function_load_str;
      this.field_searching_str= field_searching_str; 
    }
    getNew() : TypeRef {
        return new this.typeRef();
    }
    nzInitData() {
     
      this.nzInitDataTable();
    }
   
    nzInitDataTable() {
      this.nzItemList = [];
      this.nzPaginatedItemList = null;
      this.nzItemList = [];
      this.nzTotalItem = 0;
      this.nzRowsItem = 10;
      this.nzFirstItem = 1;
      this.nzSortFieldItem = 'id';
      this.nzSortOrderItem = 'desc';
      this.nzSelectedList = [];
    }
  
   
    nzPageSizeChange(event) {
      this.nzRowsItem = event;
      this.component[this.name_function_load_str]() 
    }
  
   
    nzHandleReset(key,formGroup,criteria){
      formGroup.controls[key].reset();
      criteria[key]=null; 
    }
    nzDeleteItem(){
  
    };
  
    nzPopulateData(paginatedList: PaginatedList) {
      this.nzPaginatedItemList = paginatedList;
      if (paginatedList && paginatedList.list.length > 0) {
        this.nzTotalItem = paginatedList.dataSize;
        this.nzItemList = [...paginatedList.list];
      } else {
        this.nzItemList = [];
      } 
    }
   
    nzSearch(refDemoEntityForm?:any):any {
      this.nzInitDataTable(); 
      if(this.field_searching_str!=null && this.field_searching_str!="")
        this.component[this.field_searching_str]['formToCriteria'](refDemoEntityForm)
      else
        this.component['formToCriteria'](refDemoEntityForm)
      this.component[this.name_function_load_str]()
      
    }
    nzExport(id, fileType):void{};
  
    nzFilterChangeRadio($event,key,formgroup:FormGroup){
      formgroup.controls[key].setValue($event) 
      this.nzSearch(formgroup.value);
    }
    nzIsActiveControl(key,formgroup:FormGroup){ 
     return ( formgroup.controls[key] && formgroup.controls[key].value)
    }
    nzSortOrderChange(sort:any,key): void {
      this.nzSortFieldItem = key;
      this.nzSortOrderItem = sort == "ascend" ? 'asc' : 'desc';
      this.component[this.name_function_load_str]() 
    }
    nzCheckedChangeAll(checked: boolean) {
      if (!checked) {
        this.nzSelectedList = [];
      } else {
        this.nzSelectedList = [];
        for (const item of this.nzItemList ) { 
          this.nzSelectedList.push(item);
        }
      }
    }
  
    nzIsChecked(item: any) {
      if (this.nzSelectedList && item && item.id) {
        const index = this.nzSelectedList.findIndex(element => element.id === item.id);
        if (index >= 0) {
          return true;
        }
      }
      return false;
    }
  
    nzCheckedChange(checked: boolean, item: any) {
      if (checked) {
        let itemPush = this.getNew()
        itemPush = item.id
        this.nzSelectedList.push(itemPush);
        const items: any[] = this.nzItemList;
        if (items && this.nzSelectedList && this.nzSelectedList.length == items.length) {
          this.nzCheckedChangeAll(true);
        }
      } else {
        this.nzSelectedList.splice(this.nzSelectedList.findIndex(element => element.id === item.id), 1);
      }
    }
  
    nzIsCheckedAll() {
      if (this.nzItemList && this.nzItemList.length > 0 && this.nzSelectedList && this.nzSelectedList.length > 0) {
        for (const item of this.nzItemList) {
          const index = this.nzSelectedList.findIndex(element => element.id === item.id);
          if (index < 0) {
            return false;
          }
        }
      } else {
        return false;
      }
      return true;
    }
    //show tag list
    listToStr(list:any[],attr){
      if( list.length>1 ) return list.map(a=>a[attr]).join(', ')
      else if( list.length>0) return list[0][attr]
    }
    //show tag list
    checkBoxListToStr(list:any[],attr){
 
      if( list.length>0) return list.filter(a=>a.checked==true).map(a=>a[attr]).join(', ')
      // else if( list.length>0 && ) return list[0][attr]
    }
  }