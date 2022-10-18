export function getNetworkURI(n: string) {
    const infuraAPIKey = process.env.INFURA_API_KEY;

    if (n === "Rinkeby") return "https://rinkeby.infura.io/v3/" + infuraAPIKey;
    else if(n === "Mainnet") return "https://mainnet.infura.io/v3/" + infuraAPIKey;
    else if (n === "Bcs testnet") return "https://data-seed-prebsc-1-s1.binance.org:8545/";
    else if (n === "Polygon Mumbai") return "https://rpc-mumbai.maticvigil.com/";
    else return "";
}