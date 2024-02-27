import { Rule } from 'antd/lib/form';
import React from 'react';

export const LS_AuthKey = 'auth';
export const BASE_URL = 'https://marathon-api.clevertec.ru/';
export const AUTH_PATH = 'auth/';
export const defNavOption = { state: { from: 'form' } };

export const emailRule: Rule = {
    required: true,
    type: 'email',
    message: React.createElement(React.Fragment),
};
export const passwordRule: Rule = {
    required: true,
    min: 8,
    pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
};
