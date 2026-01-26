import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const generateVisitorId = () => {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
        visitorId = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
};

const generateSessionId = () => {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 's_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
};

const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageView = async () => {
            const visitorId = generateVisitorId();
            const sessionId = generateSessionId();

            const payload = {
                page: location.pathname,
                visitorId,
                sessionId,
                referrer: document.referrer,
                userAgent: navigator.userAgent
            };

            try {
                // Use environment variable if available, fallback to localhost
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

                await fetch(`${apiUrl}/api/view`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
            } catch (error) {
                // Silently fail - don't block UI for analytics failures
                console.error('Analytics tracking failed', error);
            }
        };

        trackPageView();
    }, [location]);
};

export default useAnalytics;
