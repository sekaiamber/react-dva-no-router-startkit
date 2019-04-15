/* eslint-disable import/prefer-default-export */
// cloud://vol-2c02b3.766f-vol-2c02b3-1258771579/projects/41568467-eb36203f.png
// https://766f-vol-2c02b3-1258771579.tcb.qcloud.la/projects/41568467-eb36203f.png

export function getWxCloudFileUrl(cloudId) {
  if (!cloudId) return cloudId || '';
  if (cloudId.indexOf('cloud://') !== 0) return cloudId || '';
  // 去掉协议
  const s1 = cloudId.split('cloud://')[1];
  // 获得/
  const slash = s1.split('/');
  const server = slash.shift();
  const domain = server.split('.')[1] + '.tcb.qcloud.la/';
  return 'https://' + domain + slash.join('/');
}
