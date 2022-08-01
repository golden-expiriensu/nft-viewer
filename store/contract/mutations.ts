interface ERC721 {
  address: string,
  tokenId: number
}

export default {
  setAddress(state: ERC721, address: string) {
    state.address = address;
  },
  setTokenId(state: ERC721, tokenId: number) {
    state.tokenId = tokenId;
  }
};
