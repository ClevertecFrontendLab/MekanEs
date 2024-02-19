import { RuleObject } from 'antd/lib/form';

export const validatePassword = (_: RuleObject, value: string) => {
    let hasUpper = false;
    let hasDigit = false;
    for (let i = 0; i < value.length; i++) {
        if (value[i] === value[i].toUpperCase() && +value[i] * 0 !== 0) {
            hasUpper = true;
        }
        if (+value[i] * 0 === 0) {
            hasDigit = true;
        }
    }
    if (hasUpper && hasDigit && value.length > 7 && value.match(new RegExp('^[A-Za-z0-9]+$'))) {
        return Promise.resolve('Пароль не менее 8 символов, с заглавной буквой и цифрой');
    }
    return Promise.reject('Пароль не менее 8 символов, с заглавной буквой и цифрой');
};
