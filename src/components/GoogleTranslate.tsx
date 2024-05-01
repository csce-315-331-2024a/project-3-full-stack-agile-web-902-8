'use client';

import React, { useEffect } from 'react';

const GoogleTranslate: React.FC = () => {
    useEffect(() => {
        // This function initializes the Google Translate widget
        const googleTranslateElementInit = () => {
            // Create a new instance of the Google Translate widget
            if ((window as any).customx_google_translate_watcher) return;
            new (window as any).google.translate.TranslateElement(
                {
                    pageLanguage: 'en', // Set the page language to English
                },
                'google_translate_element' // Specify the HTML element where the widget should be rendered
            );
            (window as any).customx_google_translate_watcher = true;
        };

        // Create a script element to load the Google Translate API
        const addScript = document.createElement('script');
        addScript.setAttribute(
            'src',
            'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        );
        // Append the script element to the document body
        document.body.appendChild(addScript);

        // Assign the initialization function to the window object
        (window as any).googleTranslateElementInit = googleTranslateElementInit;

        return () => {
            // Clean up function to remove the script when component unmounts
            document.body.removeChild(addScript); // Remove the script element from the document body
            delete (window as any).googleTranslateElementInit; // Delete the initialization function from the window object
        };
    }, []);

    return (
        <div className='h-6 w-[9rem] flex-shrink-0 flex-grow-0 overflow-y-hidden' id="google_translate_element"></div> // Render an empty div with the specified ID where the Google Translate widget will be injected
    );
};

export default GoogleTranslate;
