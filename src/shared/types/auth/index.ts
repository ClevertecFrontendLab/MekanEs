export interface LoginProps {
    email: string;
    password: string;
}
export interface LoginResponse {
    accessToken: string;
}
export interface LoginError {
    statusCode: number;
    error: string;
    message: string;
}
