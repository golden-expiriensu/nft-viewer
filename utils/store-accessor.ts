import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import contract from "~/store/contract";
import network from "~/store/network";

let contractStore: contract;
let networkStore: network;

function initialiseStores(store: Store<any>): void {
    contractStore = getModule(contract, store);
    networkStore = getModule(network, store);
}

export { initialiseStores, contractStore, networkStore }