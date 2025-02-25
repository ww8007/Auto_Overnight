import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRequestSaga } from '../hooks';
import * as api from '../lib/api/login';
import { takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import type {
	Login,
	User,
	LoginResponse,
	updateStay,
} from '../interface/login';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
const initialState: Login = {
	id: '',
	pw: '',
	cookies: '',
	loginError: '',
	outStayFrDtL: [],
	outStayStGbn: [],
	outStayToDt: [],
	tmGbn: '',
	thisYear: '',
	data: {},
	name: '',
	successList: [],
	isConfirmArray: [],
	rememberID: '',
	cookieTime: '',
};

const GET_LOGIN = 'login/GET_LOGIN';

export const getLogin = createAction(GET_LOGIN, (user: User) => user);

const getLoginSaga = createRequestSaga(GET_LOGIN, api.getLogin);

export function* loginSaga() {
	yield takeLatest(GET_LOGIN, getLoginSaga);
}

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		initialLogin: (state) => {
			state.cookies = '';
			state.loginError = '';
			state.outStayFrDtL = [];
			state.outStayStGbn = [];
			state.outStayToDt = [];
			state.tmGbn = '';
			state.thisYear = '';
			state.data = {};
			state.name = '';
			state.successList = [];
			state.isConfirmArray = [];
			state.loginError = '';
		},
		logoutHome: (state) => {
			state.cookies = '';
			state.loginError = '';
			state.outStayFrDtL = [];
			state.outStayStGbn = [];
			state.outStayToDt = [];
			state.tmGbn = '';
			state.thisYear = '';
			state.data = {};
			state.name = '';
			state.successList = [];
			state.isConfirmArray = [];
			state.loginError = '';
		},
		toggleRemember: (state, action: PayloadAction<string>) => {
			state.rememberID = action.payload;
		},
		GET_LOGIN_SUCCESS: (state, action: PayloadAction<LoginResponse>) => {
			state.cookies = action.payload.cookies;
			state.name = action.payload.name;
			state.outStayStGbn = action.payload.outStayStGbn;
			state.outStayToDt = action.payload.outStayToDt;
			state.outStayFrDtL = action.payload.outStayFrDt;
			state.thisYear = action.payload.yy;
			state.tmGbn = action.payload.tmGbn;
			state.cookieTime = dayjs().tz('Asia/Seoul').locale('ko');
			state.loginError = '';
		},
		GET_LOGIN_FAILURE: (state, action: PayloadAction<any>) => {
			state.loginError = action.payload;
		},
		makeSuccessList: (state, action: PayloadAction<updateStay>) => {
			if (action.payload.outStayFrDtLCal.length) {
				state.outStayToDt = action.payload.outStayToDtCal;
				state.outStayFrDtL = action.payload.outStayFrDtLCal;
				state.outStayStGbn = action.payload.outStayStGbnCal;
			}
			let len: number;
			if (state.outStayFrDtL) len = state.outStayFrDtL.length;
			// let day: any;
			state.successList = [];
			state.isConfirmArray = [];
			for (let i = 0; i < len; i++) {
				if (state.outStayToDt[i] === state.outStayFrDtL[i]) {
					// 시작 일 끝 일 같은 경우
					state.successList.push(state.outStayToDt[i]);
					if (state.outStayStGbn[i] === '2') {
						state.isConfirmArray.push({
							day: state.outStayToDt[i],
							isConfirm: true,
						});
					} else {
						state.isConfirmArray.push({
							day: state.outStayToDt[i],
							isConfirm: false,
						});
					}
					// if()
				}
				// state.isConfirmArray.push({})
				else {
					const diff = Number(
						dayjs(state.outStayToDt[i]).diff(state.outStayFrDtL[i], 'd')
					);
					for (let j = 0; j <= diff; j++) {
						let day = dayjs(state.outStayFrDtL[i])
							.add(j, 'd')
							.format('YYYYMMDD');
						state.successList.push(day);
						if (state.outStayStGbn[i] === '2') {
							state.isConfirmArray.push({
								day: day,
								isConfirm: true,
							});
						} else {
							state.isConfirmArray.push({
								day: day,
								isConfirm: false,
							});
						}
					}
				}
			}
		},
		setIdPw: (state, action: PayloadAction<User>) => {
			state.id = action.payload.userId;
			state.pw = action.payload.userPw;
		},
		setCookieTime: (state, action: PayloadAction<any>) => {
			state.cookieTime = action.payload;
		},
	},
	extraReducers: {},
});

export const {
	GET_LOGIN_SUCCESS,
	GET_LOGIN_FAILURE,
	initialLogin,
	setIdPw,
	logoutHome,
	makeSuccessList,
	toggleRemember,
	setCookieTime,
} = loginSlice.actions;

export default loginSlice.reducer;
