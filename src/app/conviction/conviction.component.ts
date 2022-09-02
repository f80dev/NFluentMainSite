import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-conviction',
  templateUrl: './conviction.component.html',
  styleUrls: ['./conviction.component.scss']
})
export class ConvictionComponent implements OnInit {
  @Input() width="300px";
  @Input() title="";

  constructor() { }

  ngOnInit(): void {
  }

}
