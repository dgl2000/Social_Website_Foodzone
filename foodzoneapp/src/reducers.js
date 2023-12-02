import { REQUEST_PAGE, REQUEST_ACCOUNTNAME, REQUEST_PASSWORD } from "./actions";

const initialState = {
    pageStatus: 'sign-in',
    accountName: '',
    password: ''
};

export function foodZoneApp(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PAGE:
            return { ...state, pageStatus: action.pageStatus };
        case REQUEST_ACCOUNTNAME:
            return { ...state, accountName: action.accountName };
        case REQUEST_PASSWORD:
            return { ...state, password: action.password };
        default:
            return state;
    }
}