import { CONFIG } from '../config'

export const CONSOLE = {
  log: function (message?: any, ...optionalParam: any[]): void {
    CONFIG.log && console.log(message, ...optionalParam)
  },
  info: function (message?: any, ...optionalParam: any[]): void {
    CONFIG.log && console.info(message, ...optionalParam)
  },
  warn: function (message?: any, ...optionalParam: any[]): void {
    CONFIG.log && console.warn(message, ...optionalParam)
  },
  error: function (message?: any, ...optionalParam: any[]): void {
    CONFIG.log && console.error(message, ...optionalParam)
  },
  table: function (message?: any, ...optionalParam: any[]): void {
    CONFIG.log && console.table(message, ...optionalParam)
  }

}
