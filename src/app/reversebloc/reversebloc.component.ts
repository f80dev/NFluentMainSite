import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reversebloc',
  templateUrl: './reversebloc.component.html',
  styleUrls: ['./reversebloc.component.scss']
})
export class ReverseblocComponent implements OnInit {

  @Input() icon="";
  @Input() title="";
  @Input() w_icon="55px";
  @Input() text="";
  @Input() width="22%";
  @Input() minwidth="350px";
  @Input() maxwidth="450px";
  @Input() height="270px";
  @Input() reverse=false;

  constructor() { }

  ngOnInit(): void {
  }

}
