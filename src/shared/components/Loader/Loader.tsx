import { useLottie } from 'lottie-react';
import animData from './animData.json';

export const Loader = () => {
    const options = {
        animationData: animData,
        loop: true,
    };

    const { View } = useLottie(options);

    return <>{View}</>;
};
