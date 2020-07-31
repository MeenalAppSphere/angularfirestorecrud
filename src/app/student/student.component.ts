import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { StudentModel } from "./studentmodel";
import { StudentService } from "./student.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private studentService: StudentService,
    private toastr: ToastrService,
    private activatedroute: ActivatedRoute
  ) {}

  studentModel: StudentModel[] = [];
  studentId: string;
  updateData = false;
  completed: boolean;

  studentForm = this.formBuilder.group({
    fname: ["", Validators.required],
    lname: ["", Validators.required],
    age: ["", Validators.required],
    address: ["", Validators.required]
  });

  ngOnInit() {
    this.studentId = this.activatedroute.snapshot.params.id;
    console.log(this.studentId);
    if (this.studentId) {
      this.studentService.getStudentIdData(this.studentId).subscribe(doc => {
        this.studentForm.patchValue(doc.data());
        this.updateData = true;
      });
    }
  }

  addStudent(studentModel: StudentModel) {
    this.studentService.addStudentService(studentModel).then(res => {
      this.toastr.success("Student Record Added");
      this.studentForm.reset();
    });
  }

  getStudent() {
    this.route.navigate(["/listStudent"]);
  }

  resetData() {
    this.studentForm.reset();
    this.updateData = false;
  }

  updateStudent(studentModel: StudentModel) {
    studentModel.id = this.studentId;
    this.studentService.updateStudentService(studentModel);
    this.toastr.success("Data Updated");
    this.studentForm.reset();
  }
}
