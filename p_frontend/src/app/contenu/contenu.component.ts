import { Component, OnInit } from '@angular/core';
import { EthereumService } from '../ethereum.service';
@Component({
  selector: 'app-contenu',
  templateUrl: './contenu.component.html',
  styleUrls: ['./contenu.component.css']
})
export class ContenuComponent implements OnInit {

  constructor(private ethereumService: EthereumService) { }

  ngOnInit(): void {
  }

  connectedAddress: string = ''; // Variable to store the connected address

  async connectWallet() {
    const address = await this.ethereumService.connectToMetaMask();

    this.connectedAddress = address;

  }

  shortenAddress(address: string): string {
    return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';
  }

}
