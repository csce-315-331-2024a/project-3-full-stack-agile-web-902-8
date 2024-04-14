// menu.client.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScaleContextType {
    scale: number;
    setScale: React.Dispatch<React.SetStateAction<number>>;
}

const ScaleContext = createContext<ScaleContextType>({
    scale: 1, // Default scale is 1
    setScale: () => {},
});

export const useScale = () => useContext(ScaleContext);

interface ScaleProviderProps {
    children: ReactNode;
    initialScale?: number;
}

export const ScaleProvider = ({
    children,
    initialScale = 1,
}: ScaleProviderProps) => {
    const [scale, setScale] = useState<number>(initialScale);

    // This sets the body style whenever scale changes
    React.useEffect(() => {
        const newScale = scale;
        document.body.style.transform = `scale(${newScale})`;
        document.body.style.transformOrigin = '0 0';
        document.body.style.overflow = newScale === 1 ? '' : 'auto'; // Enables scrolling when zoomed in
    }, [scale]);

    return (
        <ScaleContext.Provider value={{ scale, setScale }}>
            {children}
        </ScaleContext.Provider>
    );
};

// Button to increase the zoom level of the page.
const ZoomIn = () => {
    const { setScale } = useScale();

    const handleZoomIn = () => {
        setScale((currentScale) => currentScale * 1.1);
    };

    return <button onClick={handleZoomIn}>Zoom In</button>;
};

// Button to decrease the zoom level of the page.
const ZoomOut = () => {
    const { setScale } = useScale();

    const handleZoomOut = () => {
        setScale((currentScale) => currentScale / 1.1);
    };

    return <button onClick={handleZoomOut}>Zoom Out</button>;
};

// Button to reset the zoom level to the default.
const ResetZoom = () => {
    const { setScale } = useScale();

    const handleResetZoom = () => {
        setScale(1); // Resets scale to 100%
    };

    return <button onClick={handleResetZoom}>Reset Zoom</button>;
};

export { ZoomIn, ZoomOut, ResetZoom };
