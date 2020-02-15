import { Reducer } from 'redux';
import { Effect } from 'dva';
import { getSetting, saveSetting } from '@/services/setting';
import { message } from 'antd';
import defaultSettings, { SiteSettings } from '../../config/siteSettings';

export interface SettingModelType {
  namespace: 'settings';
  state: SiteSettings;
  effects: {
    loadSettings: Effect;
    saveSettings: Effect;
  },
  reducers: {
    changeSetting: Reducer<SiteSettings>;
  };
}

const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  effects: {
    *loadSettings(_, { call, put }) {
      const result = yield call(getSetting);
      if (result.status) {
        yield put({
          type: 'changeSetting',
          payload: result.data,
        });
      } else {
        message.error(result.message);
      }
    },
    *saveSettings({ payload }, { call, put }) {
      const result = yield call(saveSetting, payload);
      if (result.status) {
        yield put({
          type: 'changeSetting',
          payload,
        });
        message.success('已经成功更新');
      } else {
        message.error(result.message);
      }
    }
  },
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default SettingModel;
