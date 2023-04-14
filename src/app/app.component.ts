import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Howl } from 'howler';
import { UploadComponent } from './components/upload/upload.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FileUploadService } from './util/services/file-upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'noise';
  public soundList: any = [
    //   {
    //   name: 'Fire',
    //   sound: this.getMusicObject('fire.mp3'),
    //   icon: 'fa fa-fire',
    //   playing: false
    // },
    // {
    //   name: 'Raining',
    //   sound: this.getMusicObject('rain.mp3'),
    //   icon: 'fa fa-umbrella',
    //   playing: false
    // }
  ]

  constructor(public dialog: MatDialog, private db: AngularFireDatabase, private fileUploadService: FileUploadService) {
    this.getAllMusicList();
    console.log(environment);
  }

  getMusicObject(id: any, index: any) {
    this.fileUploadService.getUploadFileById('music/' + id).subscribe((resp: any) => {
      this.soundList[index].sound = new Howl({ src: resp, loop: true, html5: true, format: ['mp3', 'aac', 'wav'], volume: 0.6 })
      return resp;
    });
    return id;
  }

  play(index: any) {
    (!this.soundList[index].playing) ? this.soundList[index].sound.play() : this.soundList[index].sound.stop();
    this.soundList[index].playing = !this.soundList[index].playing;
  }

  increaseVolume(index: any, event: any) {
    this.soundList[index].sound.volume(event.value);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UploadComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getAllMusicList() {
    this.db.list('music').valueChanges().subscribe((resp: any) => {
      this.soundList = resp.map((i: any, index: any) => {
        return {
          name: i.name,
          sound: this.getMusicObject(i.fileId, index),
          icon: i.icon,
          playing: false
        }

      })
    });
  }

}
