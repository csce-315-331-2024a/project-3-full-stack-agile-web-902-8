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
        // Calculate the scaled dimensions.
        const scaledWidth = `${document.documentElement.clientWidth / scale}px`;
        const scaledHeight = `${document.documentElement.clientHeight / scale}px`;
    
        // Apply the transformation.
        document.body.style.transform = `scale(${scale})`;
        document.body.style.transformOrigin = 'top left';
        document.body.style.width = scaledWidth;
        document.body.style.height = scaledHeight;
        document.body.style.overflowX = 'auto'; // Allow horizontal scrolling.
        document.body.style.overflowY = 'auto'; // Allow vertical scrolling if needed.
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
        //className={design.genresbutton}
        className="bg-secondary py-2 px-3 rounded-xl text-sm mr-[10px] mt-[10px] hover:cursor-pointer hover:bg-secondary/70"
    >Zoom In</button>;
};

export const ZoomOut = () => {
    const { scale, setScale } = useScale();
    return <button onClick={() => setScale(scale / 1.1)}
        //className={design.genresbutton}
        className="bg-secondary py-2 px-3 rounded-xl text-sm mr-[10px] mt-[10px] hover:cursor-pointer hover:bg-secondary/70"
    >Zoom Out</button>;
};

export const ResetZoom = () => {
    const { setScale } = useScale();
    return <button onClick={() => setScale(1)}
        //className={design.genresbutton}
        className="bg-secondary py-2 px-3 rounded-xl text-sm mr-[10px] mt-[10px] hover:cursor-pointer hover:bg-secondary/70"
    >Reset Zoom</button>;
};
