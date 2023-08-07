const axios = require('axios').default;
const lockIP = `http://192.168.1.157`;

exports.triggerUnlock = async () => {
  return axios
    .get(`${lockIP}/relay/1?turn=on`)
    .catch((err) => {
      return err.response;
    });
};

exports.triggerLock = async () => {
    return axios
      .get(`${lockIP}/relay/1?turn=off`)
      .catch((err) => {
        return err.response;
      });
  };
