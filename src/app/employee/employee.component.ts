import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../shared/department.service';
import { EmployeeService } from '../shared/employee.service';
import { NotificationService } from '../shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service:EmployeeService ,
    public departmentService:DepartmentService,
    private notification:NotificationService,
    public dialogRef:MatDialogRef<EmployeeComponent>) { }
    date:any

  ngOnInit(): void {
    this.service.getEmployees();
    console.log(this.service.getEmployees())
  }
  onClear()
    {this.service.form.reset();
      this.service.initializeFormGroup();

    }
  onSubmit(){
    if(this.service.form.valid){
      if(this.service.form.value.$key==null){
        this.service.insertEmployee(this.service.form.value)

      }
      else{
        this.service.updateEmployee(this.service.form.value)

      }
      console.log(this.service.form.getRawValue()['hireDate'])
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notification.success(':: Submitted Successfully')

      this.onClose()
    }
  }
  onClose(){
    this.service.form.reset()
    this.service.initializeFormGroup()
    this.dialogRef.close()
  }
}
