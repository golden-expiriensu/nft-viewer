<script lang="ts">
import { getNetworkURI } from "~/utils";
import { networkStore, contractStore } from "~/store";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            contractAddress: "",
            tokenId: 0
        };
    },
    computed: {
        networkName() {
            return networkStore.name;
        },
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

<template>
    <div class="row align-items-center">
        <b-input-group class="m-2">
            <template #prepend>
                <b-dropdown variant="info">
                    <template #button-content>
                        {{ networkName || "Select network" }}
                    </template>

                    <b-dropdown-item :active="networkName === 'Mainnet'" @click="setNetwork('Mainnet')">
                        Mainnet
                    </b-dropdown-item>
                    <b-dropdown-item :active="networkName === 'Rinkeby'" @click="setNetwork('Rinkeby')">
                        Rinkeby
                    </b-dropdown-item>
                    <b-dropdown-item :active="networkName === 'Bcs testnet'" @click="setNetwork('Bcs testnet')">
                        Bsc testnet
                    </b-dropdown-item>
                </b-dropdown>
            </template>

            <b-form-input @input="setContractAddress" :value="contractAddress" placeholder="Contract address" />

            <b-form-input @input="setTokenId" :value="tokenId" placeholder="Token ID" />
        </b-input-group>
    </div>
</template>
