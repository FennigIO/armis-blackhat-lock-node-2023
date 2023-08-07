const axios = require('axios').default;
const lockIP = `http://192.168.1.182`;

exports.triggerUnlock = async () => {
  return axios
    .get(`${lockIP}/relay/0?turn=on&timer=2`)
    .catch((err) => {
      return err.response;
    });
};

exports.triggerLock = async () => {
    return axios
      .get(`${lockIP}/relay/0?turn=off`)
      .catch((err) => {
        return err.response;
      });
  };
