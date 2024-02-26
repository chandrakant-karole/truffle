import { Injectable } from "@angular/core";
import { ethers } from 'ethers';

@Injectable({
    providedIn: 'root'
})

export class EthereumService {

    private provider: ethers.BrowserProvider | undefined;

    constructor() {
        this.init();
    }

    private async init() {
        if (typeof window.ethereum !== 'undefined') {
            this.provider = new ethers.BrowserProvider(window.ethereum);
        } else {
            console.error('Please install MetaMask!');
        }
    }

    async connectToMetaMask(): Promise<string> {
        try {
            await this.provider?.send("eth_requestAccounts", []);
            const signer = await this.provider?.getSigner();
            // Adding Network
            await this.provider?.send("wallet_addEthereumChain", [{
                chainId: "0x539",
                rpcUrls: ["HTTP://127.0.0.1:7545"],
                chainName: "Ganache",
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18
                },
                // blockExplorerUrls: ["https://polygonscan.com/"]
            }])
            // Switching network 
            const network = await signer?.provider.getNetwork();
            if (Number(network?.chainId) !== 1337) {
                await this.provider?.send("wallet_switchEthereumChain", [{ chainId: "0x539" }])
            }
            return signer?.getAddress() ?? '';
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            return ''; // Return an empty string or handle the error as appropriate
        }
    }
}