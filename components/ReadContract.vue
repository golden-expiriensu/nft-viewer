<script>
import { defineComponent } from "vue"
import { getTokenMetadata } from "~/utils/web3/getTokenMetadata"
import { networkStore, contractStore } from "~/store"

export default defineComponent({
    data() {
        return {
            metadata: {
                description: "",
                image: ""
            },
            fetchContractError: "",
            isFetchingContract: false
        }
    },
    computed: {
        networkURI() { return networkStore.uri; },
        contractAddress() { return contractStore.address },
        tokenId() { return contractStore.tokenId; },
    },
    methods: {
        async fetchERC721(uri, address, tokenId) {
            this.isFetchingContract = true;
            if (this.metadata.image !== "") this.metadata.image = "";
            if (this.metadata.description !== "") this.metadata.description = "";

            const result = await getTokenMetadata(this, uri, address, tokenId);

            if (!result.error) {
                this.metadata.description = result.metadata.description;
                this.metadata.image = result.metadata.image;
                if (this.fetchContractError !== "") this.fetchContractError = "";
            } else {
                this.fetchContractError = result.error;
            }

            this.isFetchingContract = false;
        },
        async copyToClipboard(text) {
            await navigator.clipboard.writeText(text);
        },
        async hideModal(id, delay) {
            setTimeout(() => {
                this.$bvModal.hide(id);
            }, delay);
        }
    }
})
</script>

<template>
    <div class="text-white mx-2">
        <div class="row">
            <b-button variant="info" @click="fetchERC721(networkURI, contractAddress, tokenId)" class="mb-2">
                Fetch contract data
            </b-button>
            <div v-if="isFetchingContract" class="ml-2 mt-1 spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <p class="ml-2 mt-2">{{ fetchContractError }}</p>
        </div>

        <div v-if="metadata.description" class="row border-top border-bottom border-white pt-2">
            <p>
                <b-button v-b-modal.desc-copied-modal variant="info"
                    @click="copyToClipboard(metadata.description); hideModal('desc-copied-modal', 1000)">
                    Description</b-button>
                {{ metadata.description }}
            </p>
            <b-modal hide-backdrop content-class="shadow" size='sm' buttonSize='sm' hide-header hide-footer
                id="desc-copied-modal">Description copied to
                clipboard</b-modal>
        </div>

        <div v-if="metadata.image" class="row justify-content-center my-2">
            <img :src="metadata.image" class="nft-image mb-2" />
        </div>
    </div>
</template>