'use client';
import design from '@/app/manager/report_page/page.module.css';
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
        document.body.style.transformOrigin = 'top left';
        document.body.style.width = `${document.documentElement.clientWidth / scale}px`;
        document.body.style.height = `${document.documentElement.clientHeight / scale}px`;
        document.body.style.overflow = 'hidden'; // To prevent any scrolling caused by transformation
    }, [scale]);

    return (
        <ScaleContext.Provider value={{ scale, setScale }}>
            {children}
        </ScaleContext.Provider>
    );
};

export const ZoomIn = () => {
    const { scale, setScale } = useScale();
    return <button onClick={() => setScale(scale * 1.1)}
        className={design.genresbutton}
    >Zoom In</button>;
};

export const ZoomOut = () => {
    const { scale, setScale } = useScale();
    return <button onClick={() => setScale(scale / 1.1)}
        className={design.genresbutton}
    >Zoom Out</button>;
};

export const ResetZoom = () => {
    const { setScale } = useScale();
    return <button onClick={() => setScale(1)}
        className={design.genresbutton}
    >Reset Zoom</button>;
};