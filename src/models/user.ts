import { Effect } from 'dva';
import { Reducer } from 'redux';
import { stringify } from 'querystring';
import { router } from 'umi';

import { queryCurrent, query as queryUsers, fakeLogout } from '@/services/user';
import { getPageQuery } from '@/utils/utils';

export interface CurrentUser {
  avatar?: string;
  realName?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  id: number;
  unreadCount?: number;
  roleName?: string;
  roleColor?: string;
  roleIcon?: string;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    logout: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: { id: 0 },
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *logout(_, { call }) {
      yield call(fakeLogout);
      localStorage.removeItem('jwt-token');
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, { payload }) {
      if (state)
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            notifyCount: payload.totalCount,
            unreadCount: payload.unreadCount,
          },
        };
      return {};
    },
  },
};

export default UserModel;
