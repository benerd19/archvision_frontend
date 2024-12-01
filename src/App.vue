<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
</script>
<template>
    <el-input v-model="input" style="width: 240px" placeholder="Please input" clearable />
</template>
<style scoped lang="scss">
.text {
    &__main {
        color: red;
        font-family: 'Raleway', sans-serif;
    }
}
</style>
