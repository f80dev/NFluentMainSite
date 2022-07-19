import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  @Input() options="";
  @Input() inverse=false;
  @Input() title="";
  @Input() icon="";
  @Input() step="";
  @Input() w_icon="70%"

  constructor() { }

  ngOnInit(): void {
    if(screen.width<1000)this.inverse=false;
  }

}
