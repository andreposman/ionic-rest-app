import { Component } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  percent: Number = 0;
  radius: Number = 100;
  fullTime: any = '00:00:10';

  timer: any = false;
  progress: any = 0;
  minutes: Number = 1;
  seconds: any = 30;

  overallTimer: any = false;
  elapsed: any = {
    h: '00',
    m: '00',
    s: '00',
  };


  constructor(private insomnia: Insomnia) {

  }

  startTimer() {

    if (this.timer) {
      clearInterval(this.timer);
    }
    if (!this.overallTimer) {
      this.progressTimer();
      this.insomnia.keepAwake();
    }

    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    let timeSplit = this.fullTime.split(':');
    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    // calcula o total de segundos
    let totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);

    this.timer = setInterval(() => {

      if (this.percent === this.radius) {
        clearInterval(this.timer);
      }

      if (this.percent !== 100) {
        this.percent = Math.floor((this.progress / totalSeconds) * 100);
        this.progress++;
      }

    }, 1000);
  }

  progressTimer() {
    let countDownDate = new Date();

    this.overallTimer = setInterval(() => {
      // acha a distancai entre 'agora' e o countdown
      let now = new Date().getTime();
      let distance = now - countDownDate.getTime();

      // calculo para o tempo total
      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);

      this.elapsed.h = this.addZeroToTime(this.elapsed.h, 2);
      this.elapsed.m = this.addZeroToTime(this.elapsed.m, 2);
      this.elapsed.s = this.addZeroToTime(this.elapsed.s, 2);
    }, 1000);
  }

  addZeroToTime(number, size) {
    let s = number + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  stopTimer() {
    clearInterval(this.timer)
    clearInterval(this.overallTimer);
    this.overallTimer = false;
    this.timer = false;
    this.percent = 0;
    this.progress = 0;
    this.elapsed = {
      h: '00',
      m: '00',
      s: '00',
    };
    this.insomnia.allowSleepAgain();
  }

}

