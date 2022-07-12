 
import { 
  Injectable,
  ComponentFactoryResolver,
  ComponentFactory,
  ViewContainerRef,
} from '@angular/core';
@Injectable(
  {
    providedIn: 'root',
  }
)
/**
 * @author ajddig soufiane
 * @description cette service cree dans l'objectif de l'insirir les compôsent dynamicment dans une emplacment bien defini
 */
export class FactoryComponentService {
  rootViewContainer: ViewContainerRef; 
  constructor(private factoryResolver: ComponentFactoryResolver) { }

  setRootViewContainerRef(view: ViewContainerRef): void {
    this.rootViewContainer = view;
  }

  reset(): void {
    if( this.rootViewContainer) this.rootViewContainer.clear();
  }

  insertComponent(component:any): any {
    this.reset()
    return this.insertComponent_(component);
  } 

  private insertComponent_(componentType): any { 
    if( this.rootViewContainer){
      const factory = this.factoryResolver.resolveComponentFactory(componentType);
      return this.rootViewContainer.createComponent(factory);
    }else{
      return null;
    }
  }
}