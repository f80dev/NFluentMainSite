import { Component } from '@angular/core';

@Component({
    selector: 'app-apps',
    templateUrl: './apps.component.html',
    styleUrls: ['./apps.component.css']
})
export class AppsComponent {
  _cas_pratiques=[
    {label:"Vendre du contenu web, musique,vidéo dans la monnaie de votre choix",tags:"design"},
    {label:"limiter l'accès d'une partie de votre site aux possesseurs d'un nft",tags:"design"},
    {label:"Certifier la propriété de document en quelques clics",tags:"work"},
    {label:"Fabriquer des séries de nfts en combinant plusieurs images",tags:"design"},
    {label:"Transformer des photos en nft instantanément",tags:"events"},
    {label:"Créer des pages de ventes de vos nfts intégrée dans votre sites",tags:"design"},
    {label:"Organiser des give aways sur les possesseurs de vos nft",tags:"design,events"},
    {label:"Distribuer vos nfts directement à des adresses mails",tags:"design"},
    {label:"Vos visiteurs peuvent afficher leur nft sur un écran public",tags:"events"},
    {label:"Sécuriser votre billetterie",tags:"events"},
  ]

  _apps=[
        {
            title:"TokenForge Design",url:"https://tinyurl.com/2n4pse7v",
            image:"https://tokenforge.nfluent.io/assets/icons/design-512.png",
            description:"Service de création de visuels en série",
            tags:"design",
            claim:"Imaginez vos NFTs"
        },

        {
            title:"TokenForge",url:"https://tokenforge.nfluent.io",
            image:"https://tokenforge.nfluent.io/assets/icons/tokenforge-512.png",
            description:"Service de conception et fabrication de grande série de NFT",
            tags:"design mining nft",
            claim:"Minez vos séries de NFTs"
        },

        {
            title:"NGallery",url:"https://gallery.nfluent.io",
            image:"http://gallery.nfluent.io/assets/icons/ngallery-512.png",
            description:"NGallery affiche vos NFT sur grand écran en un seul click",
            tags:"event nft gallery",
            claim:"Exposez vos NFTs"
        },

        {
            title:"NFTLive",url:"https://nftlive.nfluent.io",
            image:"http://nftlive.nfluent.io/assets/icons/nftlive-512.png",
            description:"NFTLive transforme en quelques clics une photo en NFT",
            tags:"photo live event picture nft",
            claim:"Tranformez vos photos en NFT"
        },

        {
            title:"xGate",
            url:"http://xgate.nfluent.io",
            image:"https://s.f80.fr/assets/logo.png",
            description:"NFTLive transforme en quelques clics une photo en NFT",
            tags:"vente nft acces",
            claim:"Valoriser vos contenus"
        },
        {
            title:"AirDropper",
            url:"http://airdrop.nfluent.io",
            image:"https://airdrop.nfluent.io/assets/logo.png",
            description:"AirDropper permet de distribuer sa monnaie",
            tags:"vente token monnaie acces",
            claim:"Distribuer partout votre monnaie"
        },
        {
            title:"Bank",url:"http://bank.nfluent.io",
            image:"https://tokenforge.nfluent.io/assets/icons/bank-512.png",
            description:"Service de rechargement de money virtuel",
            tags:"faucet bank refund recharger money monnaie",
            claim:"Rechargez votre wallet"
        },

        {
            title:"TokenDoc",
            url:"https://nfluent.io/tokendoc/?p=YXBpX2tleV9kb2N1bWVudD1naXRodWJfcGF0XzExQVpKRjdYUTB0TkpVbnRQUWJIeUVfeGw2Qkt5ZjBHd2RDb0RLSWQ5ajRBNmNzQzZITFBBazAwNERMRElqME9FZzdUVFJGQUNLNEdwbEREOWwmYXBwbmFtZT1Ub2tlbkRvYyZiYWNrZ3JvdW5kPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRmFzc2V0cyUyRnBhcGVyMS5qcGcmY2d1PWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRm1lbnRpb25zX2xlZ2FsZXMuaHRtbCZjbGFpbT1TaWduZXolMjB2b3MlMjBkb2N1bWVudHMlMjBlbiUyMDMlMjBjbGlja3MmY29sbGVjdGlvbj1NQUNPTDBYRi1mNTMxMDEmY29tbWVudD1iNjQlM0FiblZzYkElM0QlM0QmY29tcGFueT1ORmx1ZW5UJmNvbnRhY3Q9Y29udGFjdCU0MG5mbHVlbnQuaW8mZmF2aWNvbj1odHRwcyUzQSUyRiUyRnd3dy5zaGFyZWljb24ubmV0JTJGZGF0YSUyRjI1NngyNTYlMkYyMDE2JTJGMDclMkYwNiUyRjc5MTcxMF9kb2N1bWVudF81MTJ4NTEyLnBuZyZmaWF0X3ByaWNlPTEmbG9nbz1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZsb2dvLnBuZyZtYXJxdWU9TmZsdWVudCZtZXJjaGFudC5jb250YWN0PWNvbnRhY3QlNDBuZmx1ZW50LmlvJm1lcmNoYW50LmNvdW50cnk9RlImbWVyY2hhbnQuY3VycmVuY3k9RVVSJm1lcmNoYW50LmlkPUJDUjJETjRUWUQ0WjVYQ1ImbWVyY2hhbnQubmFtZT1OZmx1ZW50JTIwU3RvcmUmbWVyY2hhbnQud2FsbGV0LmFkZHJlc3M9ZXJkMWdrZDZmOHdtNzl2M2ZzeXlrbHAycWtocTBlZWsyOGNucjRqaGo5aDg3endxeHdkejd1d3N0ZHpqM20mbWVyY2hhbnQud2FsbGV0Lm5ldHdvcms9ZWxyb25kLWRldm5ldCZtZXJjaGFudC53YWxsZXQudG9rZW49TkZMVUNPSU4tNDkyMWVkJm1lcmNoYW50LndhbGxldC51bml0eT1OZmx1Q29pbiZtaW5lcj1kdWR1bGUlM0ElMjBaMEZCUVVGQlFtdGhjVXhyVmxkV1MzZE5kVWMyT1dwMmVVZDJYMFJyVFRobmMzWjVVazVJVWxwUk1uVmZSazlGZWs1VU1IbERUMmxHVTBWdGJqZHhjbVZXVlZOb2FVVk1RbmRNYlVWYWVuRnZZMjluYldoUVExcGpVRUo2YWxWTGFFbG1lbTB6U0RKRGVIWXpXVVJmYVZKcFNXMUZTRVZaTkZsNFMyaEtTVmRhYWxSRlZFMWZNRUp6YW0xM1F6bGxia1ZLTWpWWU9XcDRUMTk1Um5oVVNsQXpMV1oyVGt0UVRtVnRkMVJ2ZWtOU1YwaEJkV1ZaUFElM0QlM0QmbmV0d29ya3M9ZWxyb25kLWRldm5ldCZwcmljZT0yJnN0b2NrYWdlPW5mbHVlbnQtc2VydmVyJnN0b2NrYWdlX2RvY3VtZW50PW5mbHVlbnQtc2VydmVyJnN0eWxlPW5mbHVlbnQuY3NzJnRvb2xiYXI9ZmFsc2UmdXJsPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRiUzRmdvJTNEdG9rZW5kb2MmdmlzdWFsPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRmFzc2V0cyUyRnNpZ25hdHVyZS5qcGcmd2Vic2l0ZT1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8mdGl0bGU9VG9rZW5Eb2M%3D",
            image:"https://nfluent.io/assets/icons/tokendoc-512.png",
            description:"Service de création de visuels en série",
            claim:"Signez vos documents"
        },


        {
            title:"CandyMachine",
            url:"https://tokenforge.nfluent.io/dm/?p=YXBwbmFtZT1EZWFsJTIwTWFjaGluZSZiYWNrZ3JvdW5kPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRmFzc2V0cyUyRnBhcGVyMS5qcGcmY2d1PWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRm1lbnRpb25zX2xlZ2FsZXMuaHRtbCZjbGFpbT1ORlQlMjBHYWxsZXJ5JmNvbGxlY3Rpb249TkZMVVBBU1MtOTJiNDA5JmNvbW1lbnQ9YjY0JTNBYm5Wc2JBJTNEJTNEJmNvbXBhbnk9TkZsdWVuVCZjb250YWN0PWNvbnRhY3QlNDBuZmx1ZW50LmlvJmZhdmljb249ZmF2aWNvbi5wbmcmbG9nbz1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZsb2dvLnBuZyZtYXJxdWU9TmZsdWVudCZtaW5lcj1uZmx1ZW50JTNBJTIwWjBGQlFVRkJRbXRoY1dWaVprTktXSFpaTkRoWU1VUjVOSHBDUnprd1oxVXlUa3A0ZFVvNWVDMXdkWEpYVEY5dWVEWm5SbXhhVmtKamNqWkRaV2hHVURJMWFsTlJSbk0xVWtwdFVVSmZhR1l4TWpBdFRUZFJSR3RuYkV4QmFGZ3lWVUUzZFZWcFF6UmZUMWhqWmkxNmRYRXdRM2x3VHpCTE0wNXJXWFpoVUhwWVZsTlRSRE5IV2pFMlRqWmxSWE5oU2xOQlMxOXZkMEZIYnpKbGFFaG5aMlpGYjNWa09IaEZOelI1U21SUWJUQXRValZoZFhkUlBRJTNEJTNEJm5ldHdvcmtzPWVscm9uZC1kZXZuZXQmcm95YWx0aWVzPTAuMDUmc3R5bGU9bmZsdWVudC5jc3MmdG9vbGJhcj1mYWxzZSZ1cmw9aHR0cHMlM0ElMkYlMkZ0b2tlbmZvcmdlLm5mbHVlbnQuaW8lMkZkbSZ2aXN1YWw9aHR0cHMlM0ElMkYlMkZpbWFnZXMudW5zcGxhc2guY29tJTJGcGhvdG8tMTQ0Mzg4NDU5MDAyNi0yZTRkMjFhZWU3MWMlM0ZpeGxpYiUzRHJiLTQuMC4zJTI2aXhpZCUzRE0zd3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4ZkElMjUzRCUyNTNEJTI2YXV0byUzRGZvcm1hdCUyNmZpdCUzRGNyb3AlMjZ3JTNEMTE0MyUyNnElM0Q4MCZ3ZWJzaXRlPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyZ0aXRsZT1EZWFsJTIwTWFjaGluZQ%3D%3D",
            image:"https://tokenforge.nfluent.io/assets/icons/candymachine-512.png",
            description:"Service de distribution de NFT aux hasard dans une collection",
            tags:"distributeur distribution nft achat",
            claim:"Distribuez vos NFTs"
        },


        {
            title:"Mini Store",url:"https://tokenforge.nfluent.io/cm/?p=YXBpX2tleV9kb2N1bWVudD1naXRodWJfcGF0XzExQVpKRjdYUTB0TkpVbnRQUWJIeUVfeGw2Qkt5ZjBHd2RDb0RLSWQ5ajRBNmNzQzZITFBBazAwNERMRElqME9FZzdUVFJGQUNLNEdwbEREOWwmYXBwbmFtZT1DYW5keU1hY2hpbmUmYmFja2dyb3VuZD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZwYXBlcjEuanBnJmNndT1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZtZW50aW9uc19sZWdhbGVzLmh0bWwmY2xhaW09RGlzdHJpYnVlciUyMGRlcyUyME5GVCZjb2xsZWN0aW9uPU5GTFVQQVNTLTkyYjQwOSZjb21tZW50PWI2NCUzQWJuVnNiQSUzRCUzRCZjb21wYW55PU5GbHVlblQmY29uZmlnPWh0dHBzJTNBJTJGJTJGbmZ0bGl2ZS5uZmx1ZW50LmlvJTJGYXNzZXRzJTJGY29uZmlnX25mdGxpdmVfZm9yX212eC55YW1sJmNvbnRhY3Q9Y29udGFjdCU0MG5mbHVlbnQuaW8mZmF2aWNvbj1mYXZpY29uLnBuZyZmaWF0X3ByaWNlPTAmbG9nbz1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZsb2dvLnBuZyZtYXJxdWU9TmZsdWVudCZtZXJjaGFudC5jb250YWN0PWNvbnRhY3QlNDBuZmx1ZW50LmlvJm1lcmNoYW50Lm5hbWU9TmZsdWVudCUyMFN0b3JlJm1pbmVyPW5mbHVlbnQlM0ElMjBaMEZCUVVGQlFtdGhjV1ZpWmtOS1dIWlpORGhZTVVSNU5IcENSemt3WjFVeVRrcDRkVW81ZUMxd2RYSlhURjl1ZURablJteGFWa0pqY2paRFpXaEdVREkxYWxOUlJuTTFVa3B0VVVKZmFHWXhNakF0VFRkUlJHdG5iRXhCYUZneVZVRTNkVlZwUXpSZlQxaGpaaTE2ZFhFd1EzbHdUekJMTTA1cldYWmhVSHBZVmxOVFJETkhXakUyVGpabFJYTmhTbE5CUzE5dmQwRkhiekpsYUVobloyWkZiM1ZrT0hoRk56UjVTbVJRYlRBdFVqVmhkWGRSUFElM0QlM0QmbmV0d29ya3M9ZWxyb25kLWRldm5ldCZwcmljZT0wJnByb21vdGlvbj1zcG9uc29yJTNEaHR0cHMlM0ElMkYlMkZtdWx0aXZlcnN4LmNvbSUwQXBhcnRlbmFpcmUlM0RodHRwcyUzQSUyRiUyRm5mbHVlbnQuY29tJnJveWFsdGllcz0wLjA1JnN0b2NrYWdlPW5mdHN0b3JhZ2Umc3RvY2thZ2VfZG9jdW1lbnQ9bmZsdWVudC1zZXJ2ZXImc3R5bGU9bmZsdWVudC1kYXJrLmNzcyZ0b29sYmFyPWZhbHNlJnVybD1odHRwcyUzQSUyRiUyRnRva2VuZm9yZ2UubmZsdWVudC5pbyUyRmNtJnZpc3VhbD1odHRwcyUzQSUyRiUyRmltYWdlcy51bnNwbGFzaC5jb20lMkZwaG90by0xNTc5NTgyOTQzNzQ1LWZiNzA5ZjU2OTdlYiUzRml4bGliJTNEcmItNC4wLjMlMjZpeGlkJTNETTN3eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDhmQSUyNTNEJTI1M0QlMjZhdXRvJTNEZm9ybWF0JTI2Zml0JTNEY3JvcCUyNnclM0Q2ODclMjZxJTNEODAlMjZoJTNENjAwJndlYnNpdGU9aHR0cHMlM0ElMkYlMkZuZmx1ZW50LmlvJnRpdGxlPUNhbmR5TWFjaGluZQ%3D%3D",
            image:"https://tokenforge.nfluent.io/assets/icons/ministore-512.png",
            description:"Service d'acquisition de NFT dans une collection",
            tags:"distributeur distribution nft achat",
            claim:"Distribuez vos NFTs"
        },


    ]

    open_app(app: { image: string; description: string; title: string; url: string } | { image: string; description: string; title: string; url: string }) {
        open(app.url,"App")
    }
}
