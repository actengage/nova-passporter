<template>
    <modal>
        <div class="bg-40 rounded-lg shadow-lg overflow-hidden p-8" style="width: 800px">
            <h2 class="mb-3">Secret Token</h2>
            
            <p class="mb-2">The secret token will never be shown again. Save this token for your records:</p>

            <button type="button" class="flex w-full bg-black text-white rounded mb-3" @click="copyToClipboard">
                <pre class="p-3 flex-1 block text-left overflow-hidden" style="border-top-right-radius: 0; border-bottom-right-radius: 0"><code>{{ resource.secret }}</code></pre>
                <div class="flex items-center">
                    <div class="p-3 bg-black rounded" style="border-top-left-radius: 0; border-bottom-left-radius: 0; fill: white">
                        <svg viewBox="0 0 20 20" style="width: 1em;"><path d="M7.03 2.6a3 3 0 0 1 5.94 0L15 3v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h1V3l2.03-.4zM5 6H4v12h12V6h-1v1H5V6zm5-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
                    </div>
                </div>
            </button>

            <div class="flex">
                <div class="ml-auto">
                    <button
                        id="confirm-ok-button"
                        data-testid="ok-button"
                        type="button"
                        class="btn btn-default btn-primary"
                        @click="$emit('close')"
                    >
                        {{ __('Close Window') }}
                    </button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    props: {
        resource: {
            type: Object,
            required: true
        }
    },
    methods: {
        copyToClipboard() {
            var blob = new Blob([this.resource.secret], {type: 'text/plain'});

            const data = [new ClipboardItem({ 'text/plain': blob })];

            navigator.clipboard.write(data);

            this.$emit('copy', this.resource.secret);
        }
    },
    mounted() {
        this.$nextTick(() => this.copyToClipboard());
    }
}
</script>