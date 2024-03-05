import { type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
    children: ReactNode;
    container?: HTMLElement;
};

export const Portal: FC<PortalProps> = ({ children, container = document.body }) => {
    return createPortal(<div>{children}</div>, container);
};
