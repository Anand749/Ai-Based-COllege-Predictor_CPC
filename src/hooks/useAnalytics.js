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

const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageView = async () => {
            const visitorId = generateVisitorId();
            const payload = {
                page: location.pathname,
                visitorId,
                referrer: document.referrer
            };

            try {
                // Assuming backend is running on localhost:5000 during dev
                // In production, you'd make this an environment variable
                await fetch('http://localhost:5000/api/view', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
            } catch (error) {
                console.error('Analytics tracking failed', error);
            }
        };

        trackPageView();
    }, [location]);
};

export default useAnalytics;
