'use client';
import UserManager from '@/components/UserManager';
import {
    useScale,
    ScaleProvider,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '@/app/zoom.client';
/**
 * Creates the page for the administrator
 * @returns the page for the administrator
 */
export default function Administrator() {
    const { scale, setScale } = useScale();
    return (
        <ScaleProvider initialScale={1}>
            {/* Scaled content */}
            <div
                id="scaled-content"
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    overflow: 'auto',
                }}
            ></div>
            <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 justify-start">
                <h1 className="text-[4rem] font-bold relative mainHeader w-fit">
                    User Manager
                </h1>
                <UserManager />
            </main>
            {/* Fixed-position zoom control */}
            <div
                id="zoom-controls"
                style={{
                    position: 'fixed',
                    top: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1001,
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
