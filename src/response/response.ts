export class Response<T extends Record<keyof any, any>> {
  constructor(protected data: T, protected hidden: (keyof T)[] = []) {}

  private filter() {
    Object.keys(this.data).forEach((key) => {
      if (this.hidden.includes(key)) {
        delete this.data[key]
      }
    })
  }

  public make() {
    if (this.data) this.filter()
    return this.data
  }

  public static handle<T extends Record<keyof any, any>>(data: T, hidden: (keyof T)[]) {
    return new Response(data, hidden).make()
  }
}
