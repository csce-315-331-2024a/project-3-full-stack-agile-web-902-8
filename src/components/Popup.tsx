'use client';

import React from 'react';

interface PopupProps {
    children: React.ReactNode;
    showPopup: boolean;
    setShowPopup: (showPopup: boolean) => void;
}

function Popup({ children, showPopup, setShowPopup }: PopupProps) {
    return (
        <>
            {showPopup ? (
                <div className="h-full w-full absolute flex justify-center items-center bg-black/50 z-50">
                    <div className="w-1/2 rounded-lg bg-background shadow-xl max-w-[800px] h-fit">
                        <div className="relative bg-secondary/20 w-full p-5 pt-11 h-full">
                            <button
                                className="absolute top-0 right-0 p-1 hover:text-text/70 focus:text-text/70"
                                onClick={() => setShowPopup(false)}
                            >
                                <svg
                                    className="h-8 w-8 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                    />
                                </svg>
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Popup;
