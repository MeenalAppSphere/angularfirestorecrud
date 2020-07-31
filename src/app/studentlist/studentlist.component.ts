import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Route, Router } from "@angular/router";
import { StudentService } from "./../student/student.service";
import { StudentModel } from "../student/studentmodel";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-studentlist",
  templateUrl: "./studentlist.component.html",
  styleUrls: ["./studentlist.component.css"]
})
export class StudentlistComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private route: Router
  ) {}

  
  studentModel: StudentModel[] = [];
  dataPresent = false;
  dataUpdate: false;
  error = null;

  ngOnInit() {
    this.dataPresent = true;
    this.studentService.getStudentService().subscribe(studentArray => {
      this.studentModel = studentArray.map(item => {
        const obj = {
          id: item.payload.doc.id
        };
        const doc = item.payload.doc.data();
        Object.keys(doc).forEach(key => {
          obj[key] = doc[key];
        });

        return obj as any;

        this.dataPresent = false;
      });
    });
  }

  delete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.studentService.deleteStudentService(id);
      this.toastr.warning("Data Deleted");
    }
  }
  edit(studentModel:StudentModel) {
    this.route.navigate(["/student", studentModel.id]);
    //this.studentService.getStudentIdData(studentModel);
    //this.dataUpdate
    
  }
}
