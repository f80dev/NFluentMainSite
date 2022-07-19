import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.scss']
})
export class BlocComponent implements OnInit {
  @Input() icon="";
  @Input() title="";
  @Input() w_icon="45px";
  @Input() text="";
  @Input() width="350px";
  @Input() height="220px";

  constructor() { }

  ngOnInit(): void {

  }

}
