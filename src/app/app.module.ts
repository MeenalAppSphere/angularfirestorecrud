import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { StudentComponent } from "./student/student.component";
import { StudentlistComponent } from "./studentlist/studentlist.component";
//import { StudentService } from "./student/student.service";
import { StudentService } from "./student/student.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";

const route: Routes = [
  { path: "", redirectTo: "student", pathMatch: "full" },
  { path: "student", component: StudentComponent },
  { path: "student/:id", component: StudentComponent },
  { path: "listStudent", component: StudentlistComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(route),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    StudentComponent,
    StudentlistComponent
  ],
  bootstrap: [AppComponent],
  providers: [StudentService]
})
export class AppModule {}
