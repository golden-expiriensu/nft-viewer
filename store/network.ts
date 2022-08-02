import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
  name: "network",
  namespaced: true,
  stateFactory: true,
})
export default class extends VuexModule {
  name: string = "";
  uri: string = "";

  @Mutation
  public setNetwork(params: { name: string; uri: string }) {
    this.name = params.name;
    this.uri = params.uri;
  }
}
