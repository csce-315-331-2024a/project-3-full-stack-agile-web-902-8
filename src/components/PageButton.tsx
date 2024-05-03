// This should just be a button. Please replace it wherever you find it being used.

import React, { ReactNode } from 'react';

type ButtonProp = {
    onClick?: () => void;
    children: ReactNode;
};

/**
 * Generates a page button
 * @param param0 The props for the page button
 * @returns The page button
 */
function PageButton({ onClick, children }: ButtonProp) {
    return (
        <div style={{ textAlign: 'left' }}>
            <button onClick={onClick} type={'button'}>
                {children}
            </button>
        </div>
    );
}

export default PageButton;
