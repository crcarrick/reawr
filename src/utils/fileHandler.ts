interface IFileHandlerCallback {
  (response: Electron.ProtocolResponse): void
}

export function fileHandler(
  request: Electron.ProtocolRequest,
  callback: IFileHandlerCallback
) {
  const path = request.url.replace('reawr:///', '')
  const check = path.endsWith('.mp4')

  if (!check) {
    callback({
      // -6 is FILE_NOT_FOUND
      error: -6,
    })
    return
  }

  callback({ path })
}
