import { Component, OnInit } from '@angular/core';
import LendingABI from '../../abi/lending.json';
import { ethers } from 'ethers';
// import Web3 from 'web3';
@Component({
  selector: 'app-pret',
  templateUrl: './pret.component.html',
  styleUrls: ['./pret.component.css']
})
export class PretComponent implements OnInit {
  private provider: ethers.BrowserProvider | undefined;
  contract: any;

  contractAddress = "0x2d404174C2CAb956A9cFE7fc5A85670E1c4b55F8";
  contractABI = LendingABI;

  TotalAmountValue: Number = 0;

  constructor() {
    this.initContract();
  }


  async initContract() {
    this.provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await this.provider.getSigner();
    try {
      this.contract = new ethers.Contract(this.contractAddress, this.contractABI, signer);
    } catch (error) {
      console.log("=====> ", error);
    }
  }

  ngOnInit(): void {
  }

  async CalculateInterest() {
    try {
      const result = await this.contract.calculateTotalAmount();
      this.TotalAmountValue = Number(result);
    } catch (error) {
      console.error('Error calling contract method:', error);
    }
  }

  async RepayAmount() {
    try {
      const result = await this.contract.repayLoan({ value: this.TotalAmountValue })
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

}

// contract.methods.myFunction()
//   .send(
//     {
//       value: web3.utils.toWei("1", "ether")
//     }
//   )
//   .on('transactionHash', function (hash) { console.log(hash); })