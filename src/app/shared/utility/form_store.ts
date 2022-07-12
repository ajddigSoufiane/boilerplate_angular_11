import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RefDemoEntityCriteria } from "../models";
import { Base64 } from "./webtoolkit.base64";
import * as moment from 'moment';

export class FormStore {
 
 
 
    constructor(private _activeroute:ActivatedRoute,private router :  Router) {
        
    }
   // save formgroup state
   //generate array custom to save
   /**
    * @author ajddig soufiane
    * @param currentComposent : current composent set [this]
    * @param nameFormGroup : 
    * @param toObjectCustomList 
    * @returns 
    */
    arrayCustomSave(currentComposent,nameFormGroup,toObjectCustomList){
      let objectToAdd;
      let objectCustom:any[]=[];
      for (let iterator of toObjectCustomList) {
        objectToAdd  = this.customSaveList(currentComposent,iterator.nameFuntionToLoad,nameFormGroup,iterator.formControlName);
        if(objectToAdd) objectCustom.push(objectToAdd);
      }
      return objectCustom;
    }
     //for save one elemnt of list
     customSaveList(currentComponent,listNameFunction,formGroupName,formControlName,index:any='id'){
      let formGroupObj = this.hasParent(currentComponent,formGroupName)
      if(currentComponent && formGroupObj.componentObject && formGroupName && formControlName && formGroupObj.componentObject.value[formControlName]){   
        let objectToAdd :{index?:any,formControlName?:any,valueTopatch?:any,valueSelectOFExistantList?:any,nameOFExistantList?:any}={formControlName:null,valueTopatch:null,nameOFExistantList:null};
        objectToAdd.formControlName=formControlName;
        objectToAdd.valueTopatch=formGroupObj.componentObject.value[formControlName]; 
        objectToAdd.nameOFExistantList=listNameFunction;
        objectToAdd.index=index;
        return objectToAdd;
      }else{
        return null;
      } 
    }
    //for Import one elemnt save of list
    customImportList(currentComponent,form:FormGroup,itemImport){
      if(currentComponent && form && itemImport && itemImport.nameOFExistantList ){
        let resultaComponent = this.hasParent(currentComponent,itemImport.nameOFExistantList)
        if(itemImport.nameOFExistantList  && resultaComponent.componentObject ){
          try {
 
            // let nameFunction = itemImport.nameOFExistantList;
            // let parentObject =null
            // if(itemImport.nameOFExistantList && itemImport.nameFunction.indexOf(".")!=-1){
            //   let splitByPoint= itemImport.nameFunction.split('.')
            //   parentObject = splitByPoint[0]
            //   nameFunction = splitByPoint[1]
            //   currentComponent[parentObject][nameFunction]();
            // }else{ 
            //   currentComponent[itemImport.nameOFExistantList]();
            // }
            currentComponent[resultaComponent.parentObject][resultaComponent.attr]();
          } catch (error) {
            console.error(error)
          } 
        } 
        if(itemImport.formControlName) form.controls[itemImport.formControlName].setValue( itemImport.valueTopatch);
      } 
    }
    //get value of form
    /**
     * @author ajddig soufiane
     * @param keySession :name of sessionStorage [string]
     * @param criteria : criteria of form [string]
     * @param form : form group of filter
     * @returns 
     */
    getValueInSessionStorage_FormStore(currentComponent,keySession:string, criteriaName:any,form:FormGroup) { 
      criteriaName= (criteriaName)? criteriaName :{};
        if(keySession=="" || keySession==null) keySession = this.generateNameSessionFromUrl()
        let data:any = sessionStorage.getItem(keySession);
        if(data && form){
            data = Base64.decode(data);
            if(data){
              data=JSON.parse(data);
              if(data.criteria_value){ 
                Object.assign(criteriaName, data.criteria_value);
              }
              if(data.form_value){
                form.patchValue(data.form_value)
              }
              //set Custom objet in value of object
              if(data.form_value_custom){
              
                for (let item of data.form_value_custom) {
                  this.customImportList(currentComponent,form,item);
                } 
              } 
            }  
       } 
       sessionStorage.removeItem(keySession);  
       return  criteriaName; 
    }
    //save elment of form
    /**
     * @author ajddig soufiane
     * @param keySession :name of sessionStorage [string]
     * @param currentComponent : current composent set [this]
     * @param criteriaName : criteria of form [string]
     * @param nameFormGroup : name of form [string]
     * @param toObjectCustomList list of object custom and funtion for loading  
     */
    setValueInSessionStorage_FormStore(keySession:string="",currentComponent:any,criteriaName:string,nameFormGroup:string,toObjectCustomList?:CustomElementSession[]){ 
      let criteriaObj = this.hasParent(currentComponent,criteriaName)
      let formGroupObj = this.hasParent(currentComponent,nameFormGroup)
      if(currentComponent && criteriaName && nameFormGroup && criteriaObj.componentObject && formGroupObj.componentObject ){
        let objectCustomList= this.arrayCustomSave(currentComponent,nameFormGroup,toObjectCustomList); 
        if(keySession=="" || keySession==null) keySession = this.generateNameSessionFromUrl()
        
        sessionStorage.setItem(keySession, Base64.encode('{"criteria_value" : '+JSON.stringify(criteriaObj.componentObject)+',"form_value_custom":'+((objectCustomList)?JSON.stringify(objectCustomList):"[]")+',"form_value" :'+  JSON.stringify( formGroupObj.componentObject.value)+'}'));
        return true;
      }else{
        return false
      }
    }
    hasParent(currentComponent,nameLabel){ 
      if(nameLabel && nameLabel.indexOf(".")!=0){
        let splitByPoint= nameLabel.split('.')
        let parentObject = splitByPoint[0]
        let attr = splitByPoint[1] ;
        return {parentObject : parentObject,attr : attr,componentObject:currentComponent[parentObject][attr]}
      }else{ 
        let attr = nameLabel;
        return {parentObject : null,attr : attr , componentObject:currentComponent[attr] }
      }
    }
     /**
     * @author ajddig soufiane
     * @param keySession :name of sessionStorage [string] 
     * @returns 
     */
      removeValueInSessionStorage_FormStore(keySession) {  
         sessionStorage.removeItem(keySession);   
      }
  
      generateNameSessionFromUrl(){
        const urlTree = this.router.parseUrl(this.router.url);
        let urlWithoutParams:string = urlTree.root.children['primary'].segments.map(it => it.path).join('_');
   
        if(this._activeroute.snapshot.params){
          for (const key in this._activeroute.snapshot.params) { 
            urlWithoutParams = urlWithoutParams.replace( "_"+this._activeroute.snapshot.params[key] ,'') 
          } 
        } 
        return urlWithoutParams;
      }
      getCurrentTime() {
        let p = new Date().toISOString().slice(0, 16);
        let replaceAll = (str, find, replace) => { return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace); }
        p = p.replace('T', '');
        p = replaceAll(p, '-', '');
        p = replaceAll(p, '.', '');
        p = replaceAll(p, ':', '');
        return p;

      }
      isBlank(str) {
        return (!str || /^\s*$/.test(str));
      }
      /**
       * @author ajddig soufiane
       * @param refDemoEntityForm la form pour transformer vers un list string
       * @returns 
       */
      storeTagCritier(refDemoEntityForm: FormGroup,excludeList:string[]) {
        let listTag =[]
        if(refDemoEntityForm &&  refDemoEntityForm.value ){
          let object = refDemoEntityForm.value
           for (const key in  object) {
             if (Object.prototype.hasOwnProperty.call(object, key) && excludeList.indexOf(key)==-1) {
                const element = object[key];
                let isDate = (key.indexOf('date')!=-1) 
                if(element){
                  if((typeof(element) === 'string') && !this.isBlank(element)){
                    listTag.push({title : (isDate)? moment(element).format('DD/MM/YYYY HH:mm'): element,key:key})
                  }else if(typeof(element) == 'boolean'){
                    listTag.push({title : ((element)?"Oui":"Non"),key:key})
                  }else if( element instanceof Array && element.length>1){
                    if(key.indexOf('date')!=-1){
                      let dateFrom =  moment(element[0]).format('DD/MM/YYYY HH:mm')
                      let dateTo =  moment(element[1]).format('DD/MM/YYYY HH:mm')
                        listTag.push({key:key,title: dateFrom+' - '+dateTo})
                    }else{
                      listTag.push({key:key,list: element})
                    }
                  }else if(typeof(element) == "object" ){
                    listTag.push({key:key,object: element})
                  }else if( element instanceof Date ){
                      let date =  moment(element).format('DD/MM/YYYY HH:mm')
                      listTag.push({key:key,title: date}) 
                  }
                }
               
             }
           }
        }
        return listTag;
         
      }
}

export class CustomElementSession{
  /**
   * @field nameFuntionToLoad: use for loading list of value. must be name of funtion without parametre
   */
  nameFuntionToLoad:string;
   /**
   * @field formControlName name of formcontol
   */
  formControlName : string;
  constructor(){

  }
}
