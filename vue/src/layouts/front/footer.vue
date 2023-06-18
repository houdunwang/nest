<script setup lang="ts">
const { config } = useConfigStore()
const { open } = useUtil()
</script>

<template>
  <main>
    <div class="front-footer mt-10 px-3 md:px-0">
      <div class="el-divider el-divider--horizontal">
        <div
          class="
            el-divider__text
            is-center
            rounded-lg
            bg-gradient-to-r
            from-sky-500
            to-indigo-500
            text-white
            py-1
            opacity-100
          "
        >
          我们一起前行...
        </div>
      </div>
      <div class="flex flex-col items-center justify-center pt-10 mb-5">
        <img
          src="/images/xj.jpg"
          class="h-32 rounded-lg object-cover cursor-pointer"
          @click="open('https://www.houdunren.com/live', '_blank')"
        />
        <div class="text-center mt-3 text-base font-bold">
          <span class="opacity-90 mr-2">本站编码</span>
          <a href="https://www.houdunren.com/live" target="_blank" class="text-[#ff7675] font-bold"> 向军大叔 </a>
          <br />
          <button class="el-button el-button--success mt-3 flex items-center" type="button">
            <span @click="open('https://www.houdunren.com/live', '_blank')">
              <i class="fas fa-play-circle"></i> 晚八点直播，来直播间聊天吧
            </span>
          </button>
        </div>
      </div>
    </div>

    <div
      class="
        text-center text-sm
        py-10
        px-3
        md:px-0
        leading-9
        font-normal
        text-white
        relative
        overflow-hidden
        border-t-4 border-gray-800
        bg-gray-800
      "
      id="footer"
    >
      <div>一生编程，不是口号，已经走了一半</div>
      <div class="text-center">
        <div class="text-sm">
          <span class="pr-2"> 微信: houdunren2021</span>
          <span class="pr-2"> 邮箱：2300071698@qq.com</span>
        </div>
        <div>本站技术：Nest.js、Prisma、Vue3、Mysql、Tailwindcss、Typescript、ElementUi、Vite、Pinia</div>
        <div>
          <a href="https://beian.miit.gov.cn/" target="_blank" class="text-gray-100"> ICP证: 京ICP备xxxx0009999号</a>
        </div>
      </div>
      <div class="footer-bg"></div>
    </div>
  </main>
</template>
