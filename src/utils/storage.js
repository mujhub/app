import MMKVStorage from 'react-native-mmkv-storage';

const MMKV = new MMKVStorage.Loader().initialize();

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
