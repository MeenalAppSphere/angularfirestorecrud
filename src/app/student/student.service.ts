import { AngularFirestore } from "@angular/fire/firestore";
import { StudentModel } from "./studentmodel";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class StudentService {
  constructor(private firestore: AngularFirestore) {}

  studentModel: StudentModel;
  completed = false;

  getStudentService() {
    return this.firestore.collection("studentModel").snapshotChanges();
  }

  getStudentIdData(studentModelId: string) {
    return this.firestore.doc("studentModel/" + studentModelId).get();
  }

  addStudentService(studentModel: StudentModel) {
    return this.firestore.collection("studentModel").add(studentModel);
  }

  updateStudentService(studentModel: StudentModel) {
    return this.firestore.doc('studentModel/' + studentModel.id).set(studentModel,{ merge: true });
  }

  deleteStudentService(stuModelId: string) {
    this.firestore.doc("studentModel/" + stuModelId).delete();
  }
}
