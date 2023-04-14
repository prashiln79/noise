import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private storage: AngularFireStorage
  ) {
  }

  upload(file: any, filePath: any): any {
    const formData: FormData = new FormData();
    formData.append('photo', file);
    return this.storage.upload(filePath, file).snapshotChanges()

  }

  getUploadFileById(id: string): any {
    if (id) {
      const fileRef = this.storage.ref(id);
      return fileRef.getDownloadURL();
    } else {
      let temp = new Subject();
      temp.next('')
      return temp;
    }
  }


}
