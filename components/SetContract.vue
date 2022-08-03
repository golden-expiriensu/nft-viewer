<template>
    <div class="row align-items-center">
        <b-input-group class="m-2">
            <template #prepend>
                <b-dropdown variant="info">
                    <template #button-content>
                        {{ networkName || "Select network" }}
                    </template>

                    <b-dropdown-item v-for="network in supportedNetworks" :active="network.active" :key="network.name"
                        @click="setNetwork(network.name)">
                        {{ network.name }}
                    </b-dropdown-item>
                </b-dropdown>
            </template>

            <b-form-input @input="setContractAddress" :value="contractAddress" placeholder="Contract address" />

            <b-form-input @input="setTokenId" :value="tokenId" placeholder="Token ID" />
        </b-input-group>
    </div>
</template>

<script lang="ts">
import { getNetworkURI } from "~/utils";
import { networkStore, contractStore } from "~/store";
import { defineComponent } from "vue";

class Network {
    public name: string;
    public active: boolean = false;

    constructor(name: string, active?: boolean) {
        this.name = name;
        this.active = Boolean(active);
    }

    public applyState(state: boolean): Network {
        this.active = state;
        return this;
    }

    public static createNetworks(names: string[]): Network[] {
        let result: Network[] = [];
        for (let i = 0; i < names.length; i++)
            result.push(new Network(names[i]));
        return result;
    }
}

const networks = Network.createNetworks([
    "Mainnet",
    "Rinkeby",
    "Bsc testnet"
]);

export default defineComponent({
    data() {
        return {
            contractAddress: "",
            tokenId: 0
        };
    },
    computed: {
        networkName(): string {
            return networkStore.name;
        },
        supportedNetworks(): Network[] {
            return networks.map(e => e.applyState(e.name === this.networkName))
        }
    },
    methods: {
        setNetwork(name: string) {
            networkStore.setNetwork({ name, uri: getNetworkURI(name) });
        },
        setContractAddress(address: string) {
            contractStore.setAddress(address);
        },
        setTokenId(id: number) {
            contractStore.setTokenId(id);
        }
    },
});
</script>