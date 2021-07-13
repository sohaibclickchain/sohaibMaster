import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import * as _ from "lodash";
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private firebase:AngularFireDatabase) { }
    updateKey:string=""
    employeeList!: AngularFireList<any>;
    employeeList2!: AngularFireList<any>;
   form:FormGroup = new FormGroup({
     $key:new FormControl(null),
    fullname:new FormControl('',Validators.required),
    email:new FormControl('',Validators.email),
    mobile:new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    city:new FormControl(''),
    gender:new FormControl(1),
    department:new FormControl(0),
    hireDate:new FormControl(''),
    isPermanent:new FormControl(false),

   });

   initializeFormGroup(){
     this.form.setValue({
       $key:null,
       fullname:'',
       email:'',
       mobile:'',
       city:'',
       gender:1,
       department:0,
       hireDate:'',
       isPermanent:false

     });
   }

   getDate(){
     return this.form.getRawValue()['hireDate'].toDateString()
   }
   getEmployees(){
     this.employeeList=this.firebase.list('employees');
      return this.employeeList.snapshotChanges()
    }

  insertEmployee(employee: {fullname: any;email:any;mobile:any;city:any;gender:any;department:any;hireDate:any;isPermanent:any; }){
    this.employeeList.push({

      fullname:employee.fullname,
      email:employee.email,
      mobile:employee.mobile,
      city:employee.city,
      gender:employee.gender,
      department:employee.department,
      hireDate:this.getDate(),
      isPermanent:employee.isPermanent


    })
  }

  updateEmployee(employee: { $key: any;fullname: any;email:any;mobile:any;city:any;gender:any;department:any;hireDate:any;isPermanent:any; }){
    this.employeeList.update(employee.$key,{
      fullname:employee.fullname,
      email:employee.email,
      mobile:employee.mobile,
      city:employee.city,
      gender:employee.gender,
      department:employee.department,
      hireDate:this.getDate(),
      isPermanent:employee.isPermanent
    })
  }
  deleteEmployee($key:string){
    this.employeeList.remove($key);
  }
  populateForm(employee: { [$key: string]: any; }){
    this.form.patchValue(employee)


  }
  getArray(array: any){
    return _.map(array, object =>
      _.omit(object, ['isPermanent']) // return from _.omit
    );
  }
}
