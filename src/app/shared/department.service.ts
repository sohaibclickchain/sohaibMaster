import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from "lodash";
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentList!: AngularFireList<any>;
  array : any[] = [];
  constructor(private firebase:AngularFireDatabase) {
      this.departmentList=this.firebase.list('departments');
      this.departmentList.snapshotChanges().subscribe(
        list =>{
          this.array=list.map(item=>{
            return{
              $key:item.key,
              ...item.payload.val()
            }
          })
        })
   }

   getDepartmentName($key: string){
     if($key=='0'){
       return "";
     }
     else{
        return _.find(this.array,(obj)=> {return obj.$key==$key; })['name']

        //    return _.find(this.array, function(obj) {
    //     return obj.$key === $key;
    // }), 'name';

     }
   }
}
