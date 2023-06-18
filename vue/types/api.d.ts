//请求响应结构
interface ApiData<T> {
  message?: string
  code: number
  status?: 'success' | 'error'
  data: T
}

//分页请求响应结构
interface ApiPage<T> {
  data: T[]
  meta: {
    page: number
    page_num: number
    total: number
    row: number
  }
}
