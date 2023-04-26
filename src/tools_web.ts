import {ImageItem} from "ng-gallery";

export function init_visuels(images:any[]){
    return(images.map((x:any)=>{
        return new ImageItem({src:x,thumb:x});
    }));
}
