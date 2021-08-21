import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeeModel } from '../models/employee.model';
import { ApiService } from '../shared/api.service';




@Component({
  selector: 'app-employee-dashbord',
  templateUrl: './employee-dashbord.component.html',
  styleUrls: ['./employee-dashbord.component.css']
})
export class EmployeeDashbordComponent implements OnInit {

 formValue !: FormGroup;
 employeeObj : EmployeeModel=new EmployeeModel();
 employeeData !: any;
 showAdd !: boolean;
 showUpdate !: boolean;
 
  constructor(private formbublier : FormBuilder,private api : ApiService) { }

  ngOnInit(): void {

    this.formValue =this.formbublier.group({

      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    }) 
    this.getAllEmploye();
  }
  clickAddEmployee(){
    this.formValue.reset()
    this.showAdd=true;
    this.showUpdate=false;
  }
 postEmployeeDetail(){
   this.employeeObj.firstName=this.formValue.value.firstName;
   this.employeeObj.lastName=this.formValue.value.lastName;
   this.employeeObj.email=this.formValue.value.email;
   this.employeeObj.mobile=this.formValue.value.mobile;
   this.employeeObj.salary=this.formValue.value.salary;

   this.api.postEmploye(this.employeeObj)
   .subscribe(res=>{
     console.log(res);
     alert("Employee Add Succesfully !!")
     let ref=document.getElementById('cancel')
     ref?.click();
     this.formValue.reset();
     this.getAllEmploye();
   },
   err=>{
     alert("Something Went Wrong !!")
   })
  
}
getAllEmploye(){

  this.api.getEmploye()
  .subscribe(res=>{
    this.employeeData=res;
  })
  
}
deleteEmployee(row :any){
  this.api.deleteEmploye(row.id)
  .subscribe(res=>{
    alert("Employee Deleted");
    this.getAllEmploye();
  })
}
onEdit(row: any){
  this.showAdd=false;
  this.showUpdate=true;
  this.employeeObj.id=row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName)
  this.formValue.controls['email'].setValue(row.email)
  this.formValue.controls['mobile'].setValue(row.mobile)
  this.formValue.controls['salary'].setValue(row.salary)
}

updateEmployeeDetail(){
  this.employeeObj.firstName=this.formValue.value.firstName;
  this.employeeObj.lastName=this.formValue.value.lastName;
  this.employeeObj.email=this.formValue.value.email;
  this.employeeObj.mobile=this.formValue.value.mobile;
  this.employeeObj.salary=this.formValue.value.salary;
  this.api.updateEmploye(this.employeeObj,this.employeeObj.id)
  .subscribe(res=>{
    alert("Update Sucessfully !!");
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmploye();
  })
}
}
