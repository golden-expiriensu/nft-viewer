<script>
import { getNetworkURI } from "@/utils";

export default {
    data() {
        return {
            contractAddress: "",
            tokenId: 0
        };
    },
    computed: {
        network() {
            return this.$store.state.network;
        },
    },
    methods: {
        setNetwork(name) {
            this.$store.commit("network/setNetwork", {
                name,
                uri: getNetworkURI(name),
            });
        },
        setContractAddress(address) {
            this.$store.commit("contract/setAddress", address);
        },
        setTokenId(id) {
            this.$store.commit("contract/setTokenId", id)
        }
    },
};
</script>

<template>
    <div class="row align-items-center">
        <b-input-group class="m-2">
            <template #prepend>
                <b-dropdown variant="info">
                    <template #button-content>
                        {{ network.name || "Select network" }}
                    </template>
    
                    <b-dropdown-item :active="network.name === 'Mainnet'" @click="setNetwork('Mainnet')">
                        Mainnet
                    </b-dropdown-item>
                    <b-dropdown-item :active="network.name === 'Rinkeby'" @click="setNetwork('Rinkeby')">
                        Rinkeby
                    </b-dropdown-item>
                    <b-dropdown-item :active="network.name === 'Bcs testnet'" @click="setNetwork('Bcs testnet')">
                        Bsc testnet
                    </b-dropdown-item>
                </b-dropdown>
            </template>

            <b-form-input @input="setContractAddress" :value="contractAddress" placeholder="Contract address" />

            <b-form-input @input="setTokenId" :value="tokenId" placeholder="Token ID" />
        </b-input-group>
    </div>
</template>
