<script setup lang="ts">
import SecretVue from './secret/secret.vue'
import Houdunren from './secret/houdunren.vue'
import CodeVue from './secret/code.vue'
const route = useRoute()
const { user } = useUserStore()
const tab = ref('secret')
</script>

<template>
  <main>
    <el-tabs v-model="tab" type="card" tab-position="top" @tab-click="" v-if="user">
      <el-tab-pane label="查看软件密钥" name="secret">
        <SecretVue />
      </el-tab-pane>
      <el-tab-pane label="后盾人帐号创建密钥" name="houdunren">
        <Houdunren />
      </el-tab-pane>
      <el-tab-pane label="通过口令获取密钥" name="code">
        <CodeVue />
      </el-tab-pane>
    </el-tabs>
  </main>
</template>
