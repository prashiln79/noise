import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/util/services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {


  public file: any;
  public name: any;
  public icon:any;

  constructor(private db: AngularFireDatabase, private fileUploadService: FileUploadService, public dialogRef: MatDialogRef<UploadComponent>) { }

  ngOnInit(): void {
  }

  upload() {
    let id = `music/${Date.now()}`;
    this.fileUploadService.upload(this.file['files'].item(0), id).subscribe((id: any) => {
    }, (error: any) => { }, (data: any) => {
      this.db.object(`music/${this.name}`).set({ name: this.name,icon:this.icon, fileId: id.split('music/')[1] }).then((resp) => {
        this.dialogRef.close();
      });
    });

  }

  fileSelect(e: any) {
    this.file = e;
    this.name = e['files'][0].name.split('.')[0];
  }

}
