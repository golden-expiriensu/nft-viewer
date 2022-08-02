import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { base64prefix } from "~/static/constants";
import { ERC721View as ERC721 } from "~/utils";

export const getTokenMetadata = async (
  componentInstance: any,
  uri: string,
  address: string,
  tokenId: number
) => {
  try {
    const web3Instance = new Web3(uri);
    const contractInstance = new web3Instance.eth.Contract(
      ERC721 as unknown as AbiItem,
      address
    );

    const tokenURI = await contractInstance.methods.tokenURI(tokenId).call();

    return tokenURI.includes(base64prefix.data)
      ? readBase64TokenURI(tokenURI)
      : await readLinkTokenURI(componentInstance, tokenURI);
  } catch (error) {
    console.log(error);
    return {
      metadata: parseMetadata({}),
      error,
    };
  }
};

const readBase64TokenURI = (uri: string) => {
  try {
    const rawBase64 = uri.replace(base64prefix.data, "");
    const metadata = JSON.parse(Buffer.from(rawBase64, "base64").toString());

    return {
      metadata: parseMetadata(metadata),
      error: null,
    };
  } catch (e) {
    console.log(e);
    return {
      metadata: parseMetadata({}),
      error: (e as Error).toString(),
    };
  }
};

const readLinkTokenURI = async (componentInstance: any, uri: string) => {
  try {
    const parsedURI = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    const metadata = await componentInstance.$axios.$get(parsedURI, {
      crossDomain: true,
    });
    return { metadata: parseMetadata(metadata), error: null };
  } catch (e) {
    console.log(e);
    return { metadata: parseMetadata({}), error: (e as Error).toString() };
  }
};

const parseMetadata = (metadata: any) => {
  return {
    description: metadata.description,
    image: parseImgURI(metadata.image ?? ""),
  };
};

const parseImgURI = (img: string) => {
  return img.replace("ipfs://", "https://ipfs.io/ipfs/");
};
