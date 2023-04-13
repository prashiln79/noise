import { Component } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'noise';
  public soundList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  sound = new Howl({
    src: ['assets/music/rain.mp3']
  });
  private volume = 0;
  private playSound = false;

  constructor() {

  }

  play() {
    this.playSound = !this.playSound;
    this.playSound ? this.sound.play() : this.sound.stop();
  
  }


  increaseVolume(){
    this.sound.volume(this.volume=this.volume+ 0.1);
  }

  decreaseVolume(){
    this.sound.volume(this.volume=this.volume-0.1);
  }
}
