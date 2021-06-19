<template>
    <svg
        v-if="valid"
        viewBox="0 0 20 20"
        style="width:1.5em"
        class="mr-6 fill-success"
    >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
    </svg>
    <svg v-else viewBox="0 0 20 20" style="width:1.5em" class="mr-6 fill-danger">
        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
    </svg>
</template>

<script>
export default {
    props: {
        valid: Boolean
    }
}
</script>
