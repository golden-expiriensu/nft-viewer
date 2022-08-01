import { base64prefix } from "@/constants";
import { ERC721View as ERC721 } from "@/utils";
import Web3 from "web3";

export const getTokenMetadata = async (componentInstance, uri, address, tokenId) => {
    try {
        const web3Instance = new Web3(uri);
        const contractInstance = new web3Instance.eth.Contract(ERC721, address);

        const tokenURI = await contractInstance.methods.tokenURI(tokenId).call();

        return tokenURI.includes(base64prefix.data)
            ? readBase64TokenURI(tokenURI)
            : await readLinkTokenURI(componentInstance, tokenURI);

    } catch (error) {
        console.log(error);
        return {
            metadata: parseMetadata({}),
            error
        };
    }
}

const readBase64TokenURI = (uri) => {
    try {
        const rawBase64 = uri.replace(base64prefix.data, "");
        const metadata = JSON.parse(Buffer.from(rawBase64, "base64").toString());

        return {
            metadata: parseMetadata(metadata), error: null
        }
    } catch (e) {
        console.log(e);
        return {
            metadata: parseMetadata({}),
            error: e.toString()
        }
    }
}

const readLinkTokenURI = async (self, uri) => {
    try {
        const parsedURI = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        const metadata = await self.$axios.$get(parsedURI, { crossDomain: true });
        return { metadata: parseMetadata(metadata), error: null }
    } catch (e) {
        console.log(e);
        return { metadata: parseMetadata({}), error: e.toString() }
    }
}

const parseMetadata = (metadata) => {
    return {
        description: metadata.description,
        image: parseImgURI(metadata.image ?? "")
    }
}

const parseImgURI = (img) => {
    return img.replace("ipfs://", "https://ipfs.io/ipfs/");
}