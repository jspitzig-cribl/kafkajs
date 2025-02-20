/**
 * @param {Object} options
 * @param {import("../../types").ISocketFactory} options.socketFactory
 * @param {string} options.host
 * @param {number} options.port
 * @param {Object} options.ssl
 * @param {() => void} options.onConnect
 * @param {(data: Buffer) => void} options.onData
 * @param {() => void} options.onEnd
 * @param {(err: Error) => void} options.onError
 * @param {() => void} options.onTimeout
 */
module.exports = async ({
  socketFactory,
  host,
  port,
  ssl,
  onConnect,
  onData,
  onEnd,
  onError,
  onTimeout,
}) => {
  let socket = socketFactory({ host, port, ssl, onConnect })
  if (socket && socket.then) {
    socket = await socket
  }
  socket.on('data', onData)
  socket.on('end', onEnd)
  socket.on('error', onError)
  socket.on('timeout', onTimeout)

  return socket
}
