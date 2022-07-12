import { Pipe, PipeTransform } from "@angular/core"; 
import { RefDemoEntity } from "@app/shared/models";

@Pipe({
    name: 'RefDemoEntitySelectListTableFilter'
})
export class RefDemoEntitySelectListTableFilterPipe implements PipeTransform {
    
    transform(refDemoEntityList: Array<RefDemoEntity>, libelleFilter: string, codeFilter: string): Array<RefDemoEntity> {

        if (libelleFilter || codeFilter) {
            return refDemoEntityList.filter( (refDemoEntity) => {
                //add every attrib you need to find 
                return  (libelleFilter && !this.isBlank(libelleFilter) && refDemoEntity.libelle.toLowerCase().includes(libelleFilter.toLowerCase())
                 || (codeFilter && !this.isBlank(libelleFilter)  && refDemoEntity.code.toLowerCase().includes(codeFilter.toLowerCase()))) 
            });
        }
        
        return refDemoEntityList;
    }
    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
}

