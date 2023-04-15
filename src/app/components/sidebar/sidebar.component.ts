import { Component, OnInit } from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

 openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UploadComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
