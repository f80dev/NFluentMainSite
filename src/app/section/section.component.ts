import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @Input() title: any;
  @Input() subtitle: any;
  @Input() bgcolor="white";


  constructor(

  ) { }

  ngOnInit(): void {
  }

}
