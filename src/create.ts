
export interface Layer {
  params: any;
  unique: boolean
  indexed: boolean
  name:string
  position:number
  elements:any[]
  text:string
  translation: {
    x:number | 0
    y:number | 0
  }
  scale:{
    x:number | 1
    y:number | 1
  }
}


//Décrit la structure d'une configuration pour la création des NFTs
export interface Configuration {
  name: string
  location: string  //peut être sur le serveur ou directement sur internet
  platform: {
    label: string
    value: string
  }

  width:number
  height: number

  seed: number | 0
  layers: Layer[]

  text: {
    text_to_add:string
    fontsize: number
    font: {name:string,file:string}
    color: string
    position_text: { x: any; y: any }
  }

  max_items:number
  attributes: any | {}
  limit: number
  quality: number,

  data:{
    title:string
    symbol:string
    description:string
    properties:string
    files:string
    operation:string | undefined,
    tags:string
    sequence:string[] | undefined
    creators:string
  }
}
