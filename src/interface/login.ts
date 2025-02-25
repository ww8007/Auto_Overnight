export interface Login {
	id: string;
	pw: string;
	cookies: string;
	loginError: string;
	thisYear: string;
	tmGbn: string;
	data: any;
	name: string;
	outStayFrDtL: Array<any>;
	outStayToDt: Array<any>;
	outStayStGbn: Array<any>;
	successList: Array<any>;
	isConfirmArray: Array<confirm>;
	rememberID: string;
	cookieTime: any;
}

export interface confirm {
	day: string;
	isConfirm: boolean;
}
export interface updateStay {
	outStayFrDtLCal?: Array<any>;
	outStayToDtCal?: Array<any>;
	outStayStGbnCal?: Array<any>;
}

export interface User {
	userId: string;
	userPw: string;
}

export interface LoginResponse {
	cookies: string;
	name: string;
	yy: string; // 이번 년도
	tmGbn: string; // 학기
	outStayFrDt: Array<any>; // 외박 신청 시작일
	outStayToDt: Array<any>; // 외박 신청 종료일
	outStayStGbn: Array<any>; // 성공, 실패 여부
}
