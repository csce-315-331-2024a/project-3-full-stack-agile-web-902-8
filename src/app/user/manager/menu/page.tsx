'use client';
import MenuEditer from '@/components/MenuEditer';
import { useScale, ScaleProvider, ZoomIn, ZoomOut, ResetZoom } from '@/app/zoom.client';
export default function Manager() {
    const { scale, setScale } = useScale();
    return (
        <ScaleProvider initialScale={1}>
        {/* Scaled content */}
        
        <main className={styles.main}>
            <div className={styles.description}>
                <div className={styles.body}>
                    <div>
                        <h1>Manager Page</h1>
                        <PageButton>Refresh</PageButton>
                        <MenuEditer />
                    </div>
                </div>
            </div>
        </main>
    {/* Fixed-position zoom controls */}
    <div
    id="zoom-controls"
    style={{
        position: 'fixed',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1001, // Above scaled content
        textAlign: 'center',
    }}
>
    <ZoomIn />
    <ZoomOut />
    <ResetZoom />
</div>
</ScaleProvider>
);
}




