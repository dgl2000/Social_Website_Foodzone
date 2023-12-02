/*
 * action types
 */
export const REQUEST_PAGE = "REQUEST_PAGE";
export const REQUEST_ACCOUNTNAME = "REQUEST_ACCOUNTNAME";
export const REQUEST_PASSWORD = "REQUEST_PASSWORD";

/*
 * action creator
 */
export function requestPage(status) {
    return { type: REQUEST_PAGE, status }
}

export function requestAccountName(account) {
    return { type: REQUEST_ACCOUNTNAME, account }
}

export function requestPassword(password) {
    return { type: REQUEST_PASSWORD, password }
}
