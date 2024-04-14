// menu.client.tsx
'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

interface ScaleContextType {
    scale: number;
    setScale: React.Dispatch<React.SetStateAction<number>>;
}

const ScaleContext = createContext<ScaleContextType>({
    scale: 1,
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

    useEffect(() => {
        document.body.style.transform = `scale(${scale})`;
        document.body.style.transformOrigin = 'center center';
        // Enable scrolling when zoomed in, set to 'hidden' otherwise
        document.body.style.overflow = scale > 1 ? 'auto' : 'hidden';
    }, [scale]);

    return (
        <ScaleContext.Provider value={{ scale, setScale }}>
            {children}
        </ScaleContext.Provider>
    );
};

const ZoomIn = () => {
    const { scale, setScale } = useScale();

    const handleZoomIn = () => {
        const newScale = scale * 1.1;
        setScale(newScale);
        if (newScale > 1) {
            document.body.style.overflowX = 'scroll';

            document.documentElement.style.minWidth = '200vw';
            document.documentElement.style.minHeight = '100vh';

            document.body.style.position = 'relative';
            document.body.style.top = '0';
            document.body.style.left = '0';
        }
    };

    return <button onClick={handleZoomIn}>Zoom In</button>;
};

const ZoomOut = () => {
    const { scale, setScale } = useScale();

    const handleZoomOut = () => {
        const newScale = scale / 1.1;
        setScale(newScale);
        if (newScale <= 1) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.height = '100%';
            document.documentElement.style.width = '100%';
        }
    };

    return <button onClick={handleZoomOut}>Zoom Out</button>;
};

const ResetZoom = () => {
    const { setScale } = useScale();

    const handleResetZoom = () => {
        setScale(1);

        document.body.style.overflow = 'hidden';
        document.documentElement.style.minHeight = '100vh';
        document.documentElement.style.minWidth = '100vw';
        document.body.style.position = 'static';
        document.body.style.top = '0';
        document.body.style.left = '0';
        document.body.style.right = '0';
    };

    return <button onClick={handleResetZoom}>Reset Zoom</button>;
};

export { ZoomIn, ZoomOut, ResetZoom };
