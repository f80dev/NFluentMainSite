import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.scss']
})
export class BlocComponent implements OnInit {
  @Input() icon="";
  @Input() title="";
  @Input() w_icon="55px";
  @Input() text="";
  @Input() width="22%";
  @Input() minwidth="350px";
  @Input() maxwidth="450px";
  @Input() height="270px";

  constructor() { }

  ngOnInit(): void {

  }

}
