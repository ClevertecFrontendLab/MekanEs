import { LoginProps } from '@shared/types/auth';
export interface AuthFormValues extends LoginProps {
    remember: boolean;
}
export interface AuthSlice {
    token: string | null;
    authValues: AuthFormValues | null;
    regValues: LoginProps | null;
    changePasswordValues: { password: string } | null;
}
