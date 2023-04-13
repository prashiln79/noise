import { Component } from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'noise';
  public soundList = [{
    name: 'Fire',
    sound: this.getMusicObject('fire.mp3'),
    icon: 'fa fa-fire',
    playing: false
  },
  {
    name: 'Raining',
    sound: this.getMusicObject('rain.mp3'),
    icon: 'fa fa-umbrella',
    playing: false
  }
  ]

  constructor() {
  }

  getMusicObject(name: any) {
    return new Howl({ src: ['assets/music/' + name] })
  }

  play(index: any) {
    (!this.soundList[index].playing) ? this.soundList[index].sound.play() : this.soundList[index].sound.stop();
    this.soundList[index].playing = !this.soundList[index].playing;
  }

  increaseVolume(index: any, event: any) {
    this.soundList[index].sound.volume(event.value);
  }

}
