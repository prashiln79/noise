import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Howl } from 'howler';
import { UploadComponent } from './components/upload/upload.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FileUploadService } from './util/services/file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'noise';
  public soundList: any = [];

  constructor(public dialog: MatDialog, private db: AngularFireDatabase, private fileUploadService: FileUploadService) {
    this.getAllMusicList();
  }

  getMusicObject(url: string) {
    return new Howl({ src: url, loop: true, html5: true, format: ['mp3', 'aac', 'wav'], volume: 0.6 });
  }

  getMusic(data: any) {
    this.fileUploadService.getUploadFileById('music/' + data[0]).subscribe((resp: any) => {
      this.soundList[data[1]].sound = this.getMusicObject(resp);
      this.soundList[data[1]].sound.play();
    });
  }

  play(index: any) {
    if (!this.soundList[index].playing) {
      if (this.soundList[index].sound && this.soundList[index].sound.length == 2) {
        this.getMusic(this.soundList[index].sound);
      } else {
        this.soundList[index].sound.play();
      }
    } else {
      this.soundList[index].sound.stop();
    }
    this.soundList[index].playing = !this.soundList[index].playing;
  }

  ctrlVolume(index: any, event: any) {
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
          sound: [i.fileId, index],
          icon: i.icon,
          playing: false
        }
      });
      this.soundList.push({
        name: '+Add+',
        sound: [],
        icon: 'fa fa-plus',
        playing: false
      })
    });
  }

}
