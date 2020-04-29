import axios from 'axios';

// ヘッダーなどの共通設定はここで行う。
// 全てのリクエスト、レスポンス共通処理なども設定できる https://github.com/axios/axios#interceptors
export const commonApi = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
