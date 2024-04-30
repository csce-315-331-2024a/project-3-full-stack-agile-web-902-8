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
    children: React.ReactNode;
    initialScale?: number;
}

export const ScaleProvider = ({
    children,
    initialScale = 1,
}: ScaleProviderProps) => {
    const [scale, setScale] = useState<number>(() => {
        if (typeof window !== 'undefined') {
            return parseFloat(
                localStorage.getItem('scale') || `${initialScale}`
            );
        }
        return initialScale;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('scale', scale.toString());
        }
    }, [scale]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.body.style.transform = `scale(${scale})`;
            document.body.style.transformOrigin = 'top left';
            document.body.style.overflowX = 'auto';
            document.body.style.overflowY = 'auto';
        }
    }, [scale]);

    return (
        <ScaleContext.Provider value={{ scale, setScale }}>
            {children}
        </ScaleContext.Provider>
    );
};

export const ZoomIn = () => {
    const { scale, setScale } = useScale();
    return (
        <button
            onClick={() => setScale(scale * 1.1)}
            //className={design.genresbutton}
            className="bg-secondary py-2 px-3 rounded-xl text-sm mr-[10px] mt-[10px] hover:cursor-pointer hover:bg-secondary/70"
        >
            Zoom In
        </button>
    );
};

export const ZoomOut = () => {
    const { scale, setScale } = useScale();
    return (
        <button
            onClick={() => setScale(scale / 1.1)}
            //className={design.genresbutton}
            className="bg-secondary py-2 px-3 rounded-xl text-sm mr-[10px] mt-[10px] hover:cursor-pointer hover:bg-secondary/70"
        >
            Zoom Out
        </button>
    );
};

export const ResetZoom = () => {
    const { setScale } = useScale();
    return (
        <button
            onClick={() => setScale(1)}
            //className={design.genresbutton}
            className="bg-secondary py-2 px-3 rounded-xl text-sm mr-[10px] mt-[10px] hover:cursor-pointer hover:bg-secondary/70"
        >
            Reset Zoom
        </button>
    );
};
