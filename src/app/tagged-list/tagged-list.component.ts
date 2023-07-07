import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-tagged-list',
  templateUrl: './tagged-list.component.html',
  styleUrls: ['./tagged-list.component.css']
})
export class TaggedListComponent implements OnChanges {
  @Input() options: any[]=[]
  @Input() tags:string=""
  options_to_show:any[]=[];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let tags=changes["tags"].currentValue;
    if(tags){
      this.options_to_show=[];
      for(let opt of this.options){
        if(opt.tags.indexOf(tags)>-1)this.options_to_show.push(opt)
      }
    }
  }



}
