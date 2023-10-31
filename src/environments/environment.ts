// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: "beta",
  server:"http://127.0.0.1:4242",
  appname:"NFluent Web Site",
  appli:"http://127.0.0.1:4200",
  tokenfactory:"http:/localhost:4200",
  style:"nfluent-dark.css",
  wallet:"http://127.0.0.1:4200",
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
    visual: "https://nfluent.io/assets/signature.jpg",
    cover: "https://nfluent.io/assets/paper1.jpg",
    website:"https://nfluent.io",
    style:"nfluent-dark.css",
    background:"https://nfluent.io/assets/wood2.jpg",

    stockage:"nfluent-server",
    stockage_document:"nfluent-server",

    start_config: "config_certificat.yaml",

    cost_in_fiat: 0,
    cost_in_crypto: 0,

    network:"elrond-devnet",
    miner:undefined,
    //miner:"dan: Z0FBQUFBQmtJVXd6UTNFdE9sUzQ4djhwdjEzZ0NzSnF3cG5odXpyLTVGRURpUFJoU3V5YTZHbzFJMC1QVkNPbFpkV2I0TkVBcDVfNHVKWVNqMHo3UkxVc0QwRjRzVTIwbHA2Q0pGWnFXdWhqTThYSTJOdjhpSkhjZnZjMzZ2RDFORm84b0J6MDMwbDUyQ0JFMzNwemIxTlc4b0UxcTdXOXF5RDREYU5TTl9lbVMzV18zYWpmMkp1ZFpPcEw4N1pwVUVzVTc2NUVBTmFoZGJ6SldSMko3bHNfSnd4MEctbF9HWnVORmJIeTFneGppSGU0d0FSNnZjeWswelE5QkFoaWRqWktQb09SUGxxRXhOSFRxQUdxbmVEV0s4Tk83QlJSMUJSRzlfakhlSW1leEk1MmVVV3V6dFZfb1JrT0VhY3FrMzVCM3QxNDBXZTc3X1VvRXNJWFBGUmtadkZlSG1WQVVBPT0=",
    collection: "SEMICOLL-9cf014"
  },

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
  merchant:undefined


};



//Parametre pour elrond
// network:"elrond-devnet",
//     miner_key:"Z0FBQUFBQmtFenBPcHV4c0pDNDJtUUU4cWdseFlLdjFvR2ZOSGRqcHQ1Y1RYVTk0OFFXNDNQM28wbVZLYlpUMEx0azFISkRCU1BoNWhSeE5DSzhTd285bE53TlF0Zi10bEt5ODEzSkF4YkNQUTRYajVKZS04WjVlYnE5bFRGM284ck9aNnFBSHVEeFlyT0FpUVpCM2hsNEtERUk3LUtWdnAteXU1dkN4bVl5dTc5ekwxckU4cXNEQU1ZLUxLcTRkUTJPelU4VEc4SFN5c1ZCeS0wT0NKWjFXWVhOVjBVUmI2YVhyRjZYN09LR29iY19CUkxTOXZOM2pjWXdtQ3BjV2psSEYzSVU4M1dfUENZV0sxbU4yWDNZdlpHYUVqZS0yOHdHMGZUd2xETktfUEc4SGZVMWpTRHMtYzJZOWVKTWQydDFpbXhPanVhNGN6bEs4X2Q1c3I1RDhRS0oydmtiVmNBMmFnenI3aGFBdm5XcjI4S1Jyc0hBPQ==",
//     collection: "DUDUCOL-9d553b"

//Parametres pour polygon
// network:"polygon-devnet",
//     miner_key:"Z0FBQUFBQmtFMEZjaTJqeHRFS2xHeUxwa25YeE8yUHZuUGNRUS1LTVRQV3hkNXozalBuT2J6YWRhX2VPdUg2ajhvdWxMT3Mta2pMcHFLbmhUeElRemxqc2VJemZ1a1ZKT3U0dG9YN2dyTzQyNnhjZkhDa1YwenBnNXM5eTBnbmdsZjJ6Rm1pcFBtZVd1d0hvcFJyZ01QZTRzTGpZa2dqbDVLaXJhR0lLX2lyYm5WT3ItbkZja3JWaUV0SUxFWmxrb2pvTWN5MzhjV096d25mTHdMYVFVNUR0by02NjJ3YVNJM2VRZndrazczODdXd0t0N3Y3bUpFSEd2QTFDT19adXFORnZOZWd4RTFTSjA4V0pNOXVpa3FWbkh1WjE1ekRGSnNWQlBja0RGZ2tOZGt2cHd4U1UzeFVURlFzVDZLaTdDb3RhMEJ1UW9wcVpwWkNRNzFMUWN3c1Nfc0JjbmlZUEd3PT0=",
//     collection: "Certificat"
