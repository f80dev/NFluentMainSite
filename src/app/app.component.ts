import {AfterViewInit, Component} from '@angular/core';
declare var anime: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'NFluentWebSite';
  name:any="";
  message: any="";
  subject="";
  email="";

  init(){
    anime({
      targets: '.small-round',
      scale: {
        value:1.6,
        duration: 1,
        endDelay: 1000,
      },
      translateX: {
        value:60,
        duration: 1,
        endDelay: 1000,
      },
      direction: 'alternate',
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    anime({
      targets: '.medium-round',
      scale: 0.5,
      translateX: {
        value:-150,
        duration: 1,
        endDelay: 1000,

      },
      direction: 'alternate',
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    anime({
      targets: '.rounds-logo',
      rotate: {
        value:360,
        duration: 1,
        delay:2000
      },
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });
    this.play();
  }

  play(){
    anime({
      targets: '.small-round',
      scale: {
        value:1.6,
        duration: 2000,
        endDelay: 1000,
      },
      translateX: {
        value:60,
        duration: 2000,
        endDelay: 1000,
      },
      direction: 'alternate',
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    anime({
      targets: '.medium-round',
      scale: {
        value:0.5,
        duration: 2000,
        endDelay: 1000,
      },
      translateX: {
        value:-150,
        duration: 2000,
        endDelay: 1000,

      },
      direction: 'alternate',
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    anime({
      targets: '.rounds-logo',
      rotate: {
        value:360,
        duration: 4000,
        delay:2000
      },
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });
  }

  ngAfterViewInit(): void {
    this.play();
  }
}
