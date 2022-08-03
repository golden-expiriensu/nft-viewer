<template>
    <div class="text-white mx-2">
        <div class="row">
            <b-button variant="info" @click="fetchContract(networkURI, contractAddress, tokenId)" class="mb-2">
                Fetch contract data
            </b-button>
            <div v-if="metadata.isFetching" class="ml-2 mt-1 spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <p class="ml-2 mt-2">{{ metadata.fetchingError }}</p>
        </div>

        <div v-if="metadata.description" class="row border-top border-bottom border-white pt-2">
            <p>
                <b-button v-b-modal.desc-copied-modal variant="info"
                    @click="copyToClipboard(metadata.description); hideModal('desc-copied-modal', 1000)">
                    Description
                </b-button>
                {{ metadata.description }}
            </p>
            <b-modal hide-backdrop content-class="shadow" size='sm' buttonSize='sm' hide-header hide-footer
                id="desc-copied-modal">
                Description copied to clipboard
            </b-modal>
        </div>

        <div v-if="metadata.image" class="row justify-content-center my-2">
            <img :src="metadata.image" class="nft-image mb-2" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { getTokenMetadata } from "~/utils"
import { networkStore, contractStore } from "~/store"
import { BvModal } from "bootstrap-vue";

class Metadata {
    public description: string;
    public image: string;
    public fetchingError: string = "";

    public isFetching: boolean = false;

    constructor(desc: string, img: string) {
        this.description = desc;
        this.image = img;
    }

    public async update(updateFunc: () => Promise<{
        description: string,
        image: string,
        error: string
    }>) {
        this.beforeUpdate();
        const { description, image, error } = await updateFunc();
        [this.description, this.image, this.fetchingError] = [description, image, error];
        this.afterUpdate();
    }

    private beforeUpdate() {
        this.isFetching = true;
        this.purge();
    }

    private afterUpdate() {
        this.isFetching = false;
    }

    private purge() {
        this.description = "";
        this.image = "";
        this.fetchingError = "";
    }
}

export default defineComponent({
    data() {
        return {
            metadata: new Metadata("", ""),
        }
    },
    computed: {
        networkURI(): string { return networkStore.uri; },
        contractAddress(): string { return contractStore.address },
        tokenId(): number { return contractStore.tokenId; },
    },
    methods: {
        async fetchContract(uri: string, address: string, tokenId: number) {
            await this.metadata.update(async () => {
                const { metadata: { description, image }, error } = await getTokenMetadata(this, uri, address, tokenId);
                return { description, image, error };
            });
        },
        async copyToClipboard(text: string) {
            await navigator.clipboard.writeText(text);
        },
        async hideModal(id: string, delay: number) {
            setTimeout(() => {
                (this.$bvModal as BvModal).hide(id);
            }, delay);
        }
    }
})
</script>