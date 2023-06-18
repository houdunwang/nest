<script setup lang="ts">
const { captcha_key, captcha_value } = defineProps<{
  captcha_key: string
  captcha_value: string
}>()
const emit = defineEmits(['update:captcha_key', 'update:captcha_value'])
const { getCaptcha, captcha } = useCaptcha()

watch(captcha, () => {
  emit('update:captcha_key', captcha.value?.key)
})

await getCaptcha()
</script>

<template>
  <main>
    <section class="flex gap-1">
      <HdFormInput @input="$emit('update:captcha_value', $event.target.value)" placeholder="验证码" />
      <div v-html="captcha?.svg" @click="getCaptcha" class="cursor-pointer border rounded-lg shadow-sm"></div>
      <!-- <el-image :src="captchaValue?.img" class="rounded-md w-[180px] border cursor-pointer" @click="getCaptcha" /> -->
    </section>

    <HdError name="captcha_value" />
  </main>
</template>

<style lang="scss"></style>
