const { isIP } = require('node:net');

function launchOptions(options, base) {
  const originIp = process.env.CORTEXX_QA_ORIGIN_IP;
  if (!originIp) return options;
  if (!isIP(originIp)) throw new Error('CORTEXX_QA_ORIGIN_IP must be an IP address');
  const host = new URL(base).hostname;
  return {
    ...options,
    args: [...(options.args || []), `--host-resolver-rules=MAP ${host} ${originIp}`],
  };
}

module.exports = { launchOptions };
