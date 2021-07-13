import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeComponent } from 'src/app/employee/employee.component';
import { DepartmentService } from 'src/app/shared/department.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { FirebaseService } from '../shared/firebase.service';
import * as _ from "lodash";


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  currentUser: any

  constructor(private service:EmployeeService,
    private departmentService:DepartmentService,
    private dialog:MatDialog,
    private notificationService:NotificationService,
    private firebaseService:FirebaseService,
    private router:Router
    ) {}

  searchKey:any
  listData!: MatTableDataSource<any>;
  displayedColumns:string[]=['fullname','email','mobile','city','departmentName','hireDate', 'actions']
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  ngOnInit(): void {
    this.service.getEmployees().subscribe(list=>{

      let array=list.map(item=>{
        // _.omit(item, ['isPermanent'])
         let departmentName=this.departmentService.getDepartmentName(item.payload.val()['department'])
        return {
          $key:item.key,
          departmentName,
          ...item.payload.val()
        }
      });

      this.listData=new MatTableDataSource(array)
      this.listData.sort=this.sort;
      this.listData.paginator=this.paginator;
      this.listData.filterPredicate=(data,filter)=>{
        return this.displayedColumns.some((element => element !='actions' && element.toLowerCase().indexOf(filter.toString().toLowerCase()) != -1) )
      };
      // this.listData.filterPredicate=(data,filter)=>{
      //   return this.displayedColumns.some(ele=>{
      //     return ele !='actions' && data[ele].toLowerCase().indexOf(filter) !=-1;

      //   });
      // };

    });
  }

  onSearchClear(){
    this.searchKey=""
    this.applyFilter();
  }


  applyFilter(){

        this.listData.filter=this.searchKey.trim().toLowerCase();
  }
  onCreate(){
    this.service.initializeFormGroup();
    const dialogCongif=new MatDialogConfig();
    dialogCongif.disableClose=true
    dialogCongif.autoFocus=true
    dialogCongif.width="60%"
    this.dialog.open(EmployeeComponent, dialogCongif)
  }
  onEdit(row: { [key: string]: any; }){
     this.service.populateForm(row)
    const dialogCongif=new MatDialogConfig();
    dialogCongif.disableClose=true
    dialogCongif.autoFocus=true
    dialogCongif.width="60%"
    this.dialog.open(EmployeeComponent, dialogCongif)
  }
  onDelete($key: string){
    if(confirm('Do you Really want to Delete?')){
      this.service.deleteEmployee($key)
      this.notificationService.warn('! Deleted Successfully')
    }

  }
  onSignOut(){

    this.firebaseService.logout()

  }
}
