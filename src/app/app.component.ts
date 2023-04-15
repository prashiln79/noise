import { Component } from '@angular/core';
import { Howl, Howler } from 'howler';
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
  public setOfSoundList: any = [];
  private pageNumber: any = 0;
  private pageSize: any = 8;
  public nightON: boolean = false;

  constructor(private db: AngularFireDatabase, private fileUploadService: FileUploadService) {
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


  getAllMusicList() {
    this.db.list('music').valueChanges().subscribe((resp: any) => {
      let data = resp.map((i: any, index: any) => {
        return {
          name: i.name,
          sound: [i.fileId, index],
          icon: i.icon,
          playing: false
        }
      });

      this.setOfSoundList = this.chunks(data, this.pageSize);
      this.soundList = this.setOfSoundList[this.pageNumber];
      this.pageNumber = 0;
    });
  }

  changeMusicList(flag: any) {
    let count = flag ? this.pageNumber + 1 : this.pageNumber - 1;
    if (count < this.setOfSoundList.length && count >= 0) {
      this.pageNumber = count;
      this.soundList = this.setOfSoundList[this.pageNumber];
    }
  }


  mute(flag:boolean) {
    Howler.mute(flag);
  }


  chunks(arr: any, n: any) {
    let setOfArray = [];
    for (let i = 0; i < arr.length; i += n) {
      setOfArray.push(arr.slice(i, i + n));
    }
    return setOfArray;
  }

  turnOnNight(){
    this.nightON = !this.nightON;
  }


}
