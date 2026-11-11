// Verification-only guard for standard Node networking. Not an OS security sandbox.
const blocked = () => { throw new Error('NETWORK_DISABLED_BY_STAGE1_CHECK'); };
const net = require('node:net');
net.Socket.prototype.connect = blocked;
require('node:tls').connect = blocked;
require('node:dgram').createSocket = blocked;
for (const name of ['node:http', 'node:https']) {
  require(name).request = blocked; require(name).get = blocked;
}
require('node:http2').connect = blocked;
for (const key of ['lookup', 'resolve', 'resolve4', 'resolve6']) {
  require('node:dns')[key] = blocked;
  require('node:dns').promises[key] = blocked;
}
globalThis.fetch = blocked;
