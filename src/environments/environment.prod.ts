export const environment = {
  production: true,
  version: "0.1.36",
  server:"https://api.nfluent.io:4242",
  appname:"NFluent Web Site",
  style:"nfluent-dark.css",
  appli:"https://nfluent.io",
  tokenfactory:"https://tokenforge.nfluent.io",
  wallet:"https://wallet.nfluent.io",
  faqs:"{{domain_appli}}/assets/faqs.yaml",

  stockage:{
    stockage_document: "github-nfluentdev-storage_3-main",
    stockage:"github-nfluentdev-storage_2-main",
  },


  poh:{
    visual:"https://nfluent.io/assets/portrait.jpg",
    appname: "Proof of Humanity",
    claim:"Fabriquer une preuve d'humanité",
    collection: "POHCOLLE-efa1b3",
    miner:"dan: Z0FBQUFBQmtJVXd6UTNFdE9sUzQ4djhwdjEzZ0NzSnF3cG5odXpyLTVGRURpUFJoU3V5YTZHbzFJMC1QVkNPbFpkV2I0TkVBcDVfNHVKWVNqMHo3UkxVc0QwRjRzVTIwbHA2Q0pGWnFXdWhqTThYSTJOdjhpSkhjZnZjMzZ2RDFORm84b0J6MDMwbDUyQ0JFMzNwemIxTlc4b0UxcTdXOXF5RDREYU5TTl9lbVMzV18zYWpmMkp1ZFpPcEw4N1pwVUVzVTc2NUVBTmFoZGJ6SldSMko3bHNfSnd4MEctbF9HWnVORmJIeTFneGppSGU0d0FSNnZjeWswelE5QkFoaWRqWktQb09SUGxxRXhOSFRxQUdxbmVEV0s4Tk83QlJSMUJSRzlfakhlSW1leEk1MmVVV3V6dFZfb1JrT0VhY3FrMzVCM3QxNDBXZTc3X1VvRXNJWFBGUmtadkZlSG1WQVVBPT0=",
    network:"elrond-devnet"
  },

  tokendoc:{
    appname:"TokenDoc",
    claim:"Tokenisez vos documents en quelques clics",
    background:"./assets/wood2.jpg",

    visual: "https://nfluent.io/assets/signature.jpg",
    cover: "https://nfluent.io/assets/paper1.jpg",
    max_file_size:1000000,
    website:"https://nfluent.io",
    style:"nfluent-dark.css",
    cost_in_fiat: 1,
    cost_in_crypto: 3,
    direct_template:"https://nfluent.io/assets/certificat1.webp,https://nfluent.io/assets/certificat2.webp,https://nfluent.io/assets/certificat3.webp,https://nfluent.io/assets/certificat4.webp",
    stockage:"nfluent-server",
    stockage_document:"nfluent-server",


    start_config: "config_certificat.yaml",

    network:"elrond-devnet",
    //miner:"dan: Z0FBQUFBQmtJVXd6UTNFdE9sUzQ4djhwdjEzZ0NzSnF3cG5odXpyLTVGRURpUFJoU3V5YTZHbzFJMC1QVkNPbFpkV2I0TkVBcDVfNHVKWVNqMHo3UkxVc0QwRjRzVTIwbHA2Q0pGWnFXdWhqTThYSTJOdjhpSkhjZnZjMzZ2RDFORm84b0J6MDMwbDUyQ0JFMzNwemIxTlc4b0UxcTdXOXF5RDREYU5TTl9lbVMzV18zYWpmMkp1ZFpPcEw4N1pwVUVzVTc2NUVBTmFoZGJ6SldSMko3bHNfSnd4MEctbF9HWnVORmJIeTFneGppSGU0d0FSNnZjeWswelE5QkFoaWRqWktQb09SUGxxRXhOSFRxQUdxbmVEV0s4Tk83QlJSMUJSRzlfakhlSW1leEk1MmVVV3V6dFZfb1JrT0VhY3FrMzVCM3QxNDBXZTc3X1VvRXNJWFBGUmtadkZlSG1WQVVBPT0=",
    collection: "MACOLLEC-4356f0"
  },

  merchant:undefined

  // merchant:{
  //   id:"BCR2DN4TYD4Z5XCR",
  //   name:"NFluenT",
  //   currency:"EUR",
  //   country:"FR",
  //   contact:"contact@nfluent.io",
  //   wallet:
  //       {
  //         token:"NFLUCOIN-4921ed",
  //         address:"erd1gkd6f8wm79v3fsyyklp2qkhq0eek28cnr4jhj9h87zwqxwdz7uwstdzj3m",
  //         network:"elrond-devnet",
  //         unity: "NfluCoin",
  //         bank : "nfluent: Z0FBQUFBQmtXblgwRGxBQ21NdXFVdHFIVlZNcUN3elpKc2xmem5WNHFrZVRYSEhXZWdJSGZzeENQY2xFY0N6a0dUaDM3SU5zYjRIQmpLak12ZWxRZkJrNU4tMmtaTkVOZlhIbF9NTlNoV1FkYlUtakxyR0cyQXRJNk9JcmpUWm5rSnNJSEZTS3dMV3NGSmgtZ1lsZG5OYkJVOEZ5UU"
  //       }
  // }
};
