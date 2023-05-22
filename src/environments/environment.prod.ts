export const environment = {
  production: true,
  version: "0.1.36",
  server:"https://api.nfluent.io:4242",
  appname:"NFluent Web Site",
  appli:"https://nfluent.io",
  tokenfactory:"https://tokenforge.nfluent.io",
  wallet:"https://wallet.nfluent.io",

  stockage:{
    stockage_document: "infura",
    stockage:"github-nfluentdev-storage-main",
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

    cost_in_fiat: 1,
    cost_in_crypto: 3,


    visual: "https://nfluent.io/assets/paper1.jpg",
    stockage_document: "infura",
    stockage:"nftstorage",
    start_config: "config_certificat.yaml",

    network:"elrond-devnet",
    miner_key:"Z0FBQUFBQmtIc1pSME9EQzVHRnRzbHBaMk9LOFVyWDg3eFV0MnktdWlSNWoxNmJtQkdCMEpsZUwtTjNxZFI3WmpvcjVfbFZHYTFrTm96V1BwZnUwdFpVVHdXclRnOFpaRy0xMjAzb0loeG1ENnpiTjA3WWs1UjNQQ0xJTTR3QmpRb0k2UjRXQ2xVbVpOLUlMcHd3Y3Y4QVAxSlF5bXhMTG5sSU9DNnI3TnRFZUFQUEwyaGhwQlNCcEtFNzM2bkU2OV9TVzZQTjB3SE5WN3pHMjhReTVCTHFfcHJJNk00aXV1MG15NjUwQnlKVWo5b2xtQUs5ZHNqaG5VSWQyLXNicUdRMzNlUHdLTTYza1JzRnpVMjlab09aTm41YXBvNGFDWU03Y1Q2cW96d0lSWXZ6R0NmTnJIVHpSZWtYMTBDN3dVdm8yMFNBMV80eXhSY2d6X1o4OURXbE0xbFM1OV84ME9UNHoxYWswUFRFYVNXekRBcGkwcG1rPQ==",
    collection: "MACOLLEC-4356f0"
  },

  merchant:{
    id:"BCR2DN4TYD4Z5XCR",
    name:"NFluenT",
    currency:"EUR",
    country:"FR",
    contact:"contact@nfluent.io",
    wallet:
        {
          token:"NFLUCOIN-4921ed",
          address:"erd1gkd6f8wm79v3fsyyklp2qkhq0eek28cnr4jhj9h87zwqxwdz7uwstdzj3m",
          network:"elrond-devnet",
          unity: "NfluCoin",
          bank : "nfluent: Z0FBQUFBQmtXblgwRGxBQ21NdXFVdHFIVlZNcUN3elpKc2xmem5WNHFrZVRYSEhXZWdJSGZzeENQY2xFY0N6a0dUaDM3SU5zYjRIQmpLak12ZWxRZkJrNU4tMmtaTkVOZlhIbF9NTlNoV1FkYlUtakxyR0cyQXRJNk9JcmpUWm5rSnNJSEZTS3dMV3NGSmgtZ1lsZG5OYkJVOEZ5UU"
        }
  }
};
