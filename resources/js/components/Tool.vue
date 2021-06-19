<template>
    <div>
        <install-checklist />
    </div>
</template>

<script>
import InstallChecklist from './InstallChecklist';

export default {
    components: { InstallChecklist },
    
    metaInfo() {
        return {
          title: 'Passporter',
        }
    },
    mounted() {
        //
    },
}
</script>

<style>
/* Scoped Styles */
</style>
