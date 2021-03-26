import MMKVStorage from 'react-native-mmkv-storage';

const MMKV = new MMKVStorage.Loader().withEncryption().initialize();

export const mmkvCurrentTheme = async (theme = null) => {
  try {
    if (!theme) {
      const res = await MMKV.getStringAsync('theme');
      return parseInt(res);
    } else {
      await MMKV.setStringAsync('theme', theme.toString());
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const mmkvDMSDetails = async (username = null, password = null) => {
  try {
    if (username) {
      await MMKV.setStringAsync('username', username);
      await MMKV.setStringAsync('password', password);
      MMKV.encryption.encrypt();
      return {status: true};
    } else {
      const enc_username = await MMKV.getStringAsync('username');
      const enc_password = await MMKV.getStringAsync('password');
      console.log('res', enc_username, enc_password);
      return {status: true, username: enc_username, password: enc_password};
    }
  } catch (error) {
    console.log(error);
    return {status: false};
  }
};
