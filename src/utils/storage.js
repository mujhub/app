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

export const mmkvDMSDetails = async (
  username = null,
  password = null,
  name = null,
  clear = false,
) => {
  try {
    if (clear) {
      await MMKV.removeItem('name');
      await MMKV.removeItem('username');
      await MMKV.removeItem('password');
      return {status: true};
    }
    if (username) {
      await MMKV.setStringAsync('name', name);
      await MMKV.setStringAsync('username', username);
      await MMKV.setStringAsync('password', password);
      MMKV.encryption.encrypt();
      return {status: true};
    } else {
      const enc_name = await MMKV.getStringAsync('name');
      const enc_username = await MMKV.getStringAsync('username');
      const enc_password = await MMKV.getStringAsync('password');
      return {
        status: true,
        username: enc_username,
        password: enc_password,
        name: enc_name,
      };
    }
  } catch (error) {
    console.log(error);
    return {status: false};
  }
};

export const mmkvDefaultBlock = async (block = null) => {
  try {
    if (block) {
      await MMKV.setStringAsync('block', block);
      return {status: true};
    } else {
      const enc_block = await MMKV.getStringAsync('block');
      return {status: true, block: enc_block};
    }
  } catch (error) {
    console.log(error);
    return {status: false};
  }
};

export const mmkvEateriesList = async (array = null) => {
  try {
    if (array) {
      await MMKV.setStringAsync('eateriesList', JSON.stringify(array));
      return {status: true};
    } else {
      const enc_array = await MMKV.getStringAsync('eateriesList');
      return {status: true, value: JSON.parse(enc_array)};
    }
  } catch (error) {
    console.log(error);
    return {status: false};
  }
};

export const mmkvEateriesCards = async (array = null) => {
  try {
    if (array) {
      await MMKV.setStringAsync('eateriesCards', JSON.stringify(array));
      return {status: true};
    } else {
      const enc_array = await MMKV.getStringAsync('eateriesCards');
      return {status: true, value: JSON.parse(enc_array)};
    }
  } catch (error) {
    console.log(error);
    return {status: false};
  }
};

export const mmkvMessMenuSubscription = async (value = null) => {
  try {
    if (value) {
      await MMKV.setStringAsync('messMenuSubscription', value);
      return {status: true};
    } else {
      const enc_value = await MMKV.getStringAsync('messMenuSubscription');
      return {status: true, value: enc_value};
    }
  } catch (error) {
    console.log(error);
    return {status: false};
  }
};
