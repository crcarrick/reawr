import os from 'os'

export const isMac = os.platform() === 'darwin'
export const isWin = os.platform() === 'win32'
export const isLinux = os.platform() === 'linux'
