export class LS_service {
  static setLS(name: string, val: any): void {
      localStorage.setItem(name, JSON.stringify(val))
  }

  static getLS(name: string): any {
    let item = localStorage.getItem(name)
    if (item)
      return JSON.parse(item)
    return ''
  }

  static delLS(name: string): void {
    localStorage.removeItem(name)
  }

}