export enum Paths {
    BASE = '/',
    MAIN = '/main',
    AUTH = '/auth',
    REGISTRATION = '/auth/registration',
    AUTH_CHANGE_PASSWORD = '/auth/change-password',
    RESULT_SUCCESS = '/result/success',
    RESULT_SUCCESS_CHANGE_PASSWORD = '/result/success-change-password',
    CONFIRM_EMAIL = '/auth/confirm-email',
    RESULT_ERROR = '/result/error',
    RESULT_ERROR_US_EXIST = '/result/error-user-exist',
    RESULT_ERROR_LOGIN = '/result/error-login',
    RESULT_ERROR_NO_EMAIL = '/result/error-check-email-no-exist',
    RESULT_ERROR_CHECK_EMAIL = '/result/error-check-email',
    RESULT_ERROR_CHANGE_PASSWORD = '/result/error-change-password',
    //last
    NOT_FOUND = '*',
}

export interface CustomResponseError {
    status: number;
    data: {
        statusCode: number;
        message: string;
    };
}