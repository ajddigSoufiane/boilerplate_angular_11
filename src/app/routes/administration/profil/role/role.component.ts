import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { BaseComponent } from "@app/shared/components";
import { TreeModel } from "@app/shared/models/base-models/tree-model";
import { Role } from "@app/shared/models/role/role.model";
import { ProfilService } from "@app/shared/services/profil/profil.service";

import { TreeNode, TreeComponent } from 'angular-tree-component';
import { data } from "jquery";

@Component( {
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
export class RoleComponent extends BaseComponent implements OnInit, OnChanges {
    @Output() roleListSelected: EventEmitter<Role[]> = new EventEmitter();
    @Input() roleList: Role[] = [];
    @Input() readOnly: boolean;
    @Input() moduleId: number=0;
    checkAll: boolean;
    nodes: TreeModel[];
    treeOptions: any;
    nameFilter: string;

    @ViewChild( TreeComponent )
    tree: TreeComponent;

    constructor( private ProfilService: ProfilService ) {
        super();
    }

    ngOnInit() {
        this.nodes = [];

        if ( this.moduleId )
            this.loadRolesByCategorie();
        this.treeOptions = {
            nodeClass: ( node: TreeNode ) => {
                return 'node-' + node.data.objectType;
            }
        }

    }
    ngOnChanges( changes: SimpleChanges ) {
        
        if ( this.moduleId || this.moduleId == 0 )
            this.loadRolesByCategorie();
        this.treeOptions = {
            nodeClass: ( node: TreeNode ) => {
                return 'node-' + node.data.objectType;
            }
        }
        this.checkedSelectedRoles();
    }


    check( node, event ) {

        this.updateChildNodesCheckBoxData( node.data, event.target.checked );
        if ( node.parent && node.parent.data )
            this.updateParentNodesCheckBoxData( node.parent.data.id );
            if( node.parent.parent && node.parent.data.indeterminate == true){
                node.parent.parent.data.indeterminate = true
            }
        this.roleListSelected.emit( this.roleList );
    }


    updateChildNodesCheckBoxData( node, checked ) {
        node.checked = checked;
        if ( node.objectType == 'ROLE' ) {
            if ( checked ) {
                let index = this.roleList.findIndex( element => element.id === node.objectId );
                if ( index < 0 )
                    this.roleList.push( new Role( node.objectId ) );
            } else {
                let index = this.roleList.findIndex( element => element.id === node.objectId );
                if ( index > -1 )
                    this.roleList.splice( index, 1 );
            }
        }
        if ( node.children ) {
            node.children.forEach(( child ) => this.updateChildNodesCheckBoxData( child, checked ) );
        }
    }
    updateParentNodesCheckBoxData( nodeId ) {
        let node = this.findNodeById( nodeId );
      
        if ( node && node.children ) {
            let allChildChecked = true;
            let noChildChecked = true;
         
            for ( let child of node.children ) {
                if ( !child.checked ) {
                    allChildChecked = false;
                } else if ( child.checked ) {
                    noChildChecked = false;
                }
            }

            if ( allChildChecked ) {
                node.checked = true;
                node.indeterminate = false;
            } else if ( noChildChecked ) {
                node.checked = false;
                node.indeterminate = false;
            } else {
                node.checked = true;
                node.indeterminate = true;
            }

            if ( node.parentId )
                this.updateParentNodesCheckBoxData( node.parentId );
        }
    }


    loadRolesByCategorie() {
        this.ProfilService.getRolesCategorieByDomaine()
            .subscribe( nodes => {
                
                this.nodes = nodes;
                this.checkedSelectedRoles();
                if(this.nodes)
                for ( let i = 0 ; i<this.nodes.length ; i++){
                    if(this.nodes[i].children.length > 1){
                        for ( let j = 0 ; j<this.nodes[i].children.length ; j++){
                            if (this.nodes[i] && this.nodes[i].children[i] && this.nodes[i].children[i].indeterminate == true)
                                this.nodes[i].indeterminate = true
                        }
                    }if (this.nodes[i].children.length == 1) {
                        if (this.nodes[i] && this.nodes[i].children[i] && this.nodes[i].children[i].indeterminate == true){
                            this.nodes[i].indeterminate = true
                        }
                    }
                }
            }, error => this.showError( error.status, error.json().message ) );
    }


    checkedSelectedRoles() {
        if ( this.roleList && this.nodes )
            for ( let role of this.roleList ) {
                this.findRoleInTreeNodeByObjectId( role.id );
            }

    }


    filterTree( value ) {

        this.tree.treeModel.filterNodes( value.toUpperCase() )
    }

    findRoleInTreeNodeByObjectId( objectId ) {
        for ( var node of this.nodes ) {
            this.getNodeRole( node, objectId );
        }

    }

    findNodeById( id ) {
        for ( var node of this.nodes ) {
            let n = this.getNodeById( node, id );
            if ( n )
                return n;
        }

    }

    getNodeById( node: any, id: number ) {
        if ( node ) {
            if ( node.id == id ) {
                return node;
            } else if ( node.children ) {
                for ( let child of node.children ) {
                    let n = this.getNodeById( child, id );
                    if ( n )
                        return n;
                }
            }
        }
       
    }

    getNodeRole( node: any, objectId: number ) {
        if ( node.objectType == 'ROLE' && node.objectId == objectId ) {
            this.updateChildNodesCheckBoxData( node, true );
            if ( node.parentId )
                this.updateParentNodesCheckBoxData( node.parentId );
        } else if ( node.children ) {
            for ( let child of node.children ) {
                this.getNodeRole( child, objectId );
            }
        }
    }

    reset() {
        this.roleList = [];
    }
}
