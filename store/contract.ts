import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
  name: "contract",
  namespaced: true,
  stateFactory: true,
})
export default class extends VuexModule {
  address: string = "";
  tokenId: number = 0;

  @Mutation
  public setAddress(address: string) {
    this.address = address;
  }

  @Mutation
  public setTokenId(tokenId: number) {
    this.tokenId = tokenId;
  }
}
