import dayjs from 'dayjs'
import { ref } from 'vue'
import useStorage from './useStorage'
import { ElMessage } from 'element-plus'
const key = 'interval_exec_time'
const storage = useStorage()
let intervalId: any = 0
const time = ref<number>(0)

export default (timeout: number, fn: (...args: any[]) => Promise<void>) => {
  //定时器定义
  const interval = () => {
    intervalId = setInterval(() => {
      time.value = dayjs(storage.get(key)).add(timeout, 'second').diff(dayjs(), 'second')
      if (time.value <= 0) {
        clearInterval(intervalId)
        intervalId = undefined
      }
    }, 50)
  }

  //执行函数
  const exec = async (...args: any[]) => {
    if (storage.get(key)) return ElMessage.error(`评价${time.value}后再试`)
    await fn.apply(null, args)
    storage.set(key, dayjs(), timeout)
    interval()
  }
  if (storage.get(key)) interval()

  return { time, exec }
}
