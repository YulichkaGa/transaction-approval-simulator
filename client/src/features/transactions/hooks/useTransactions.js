import { useEffect, useState } from 'react';

import {
    getApprovedTransactions,
    simulateTransaction,
} from '../../../api/transactionsApi';

import { translations } from '../constants/translations';

function useTransactions() {
    const [region, setRegion] = useState('Israel');

    const [hour, setHour] = useState('20');
    const [minute, setMinute] = useState('00');

    const [approvedTransactions, setApprovedTransactions] = useState([]);
    const [lastResult, setLastResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [language, setLanguage] = useState('en');

    const t = translations[language];

    const loadApprovedTransactions = async () => {
        try {
            const data = await getApprovedTransactions();
            setApprovedTransactions(data);
        } catch {
            setError(t.loadApprovedError);
        }
    };

    useEffect(() => {
        void loadApprovedTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitTransaction = async (event) => {
        event.preventDefault();

        const parsedHour = Number(hour);
        const parsedMinute = Number(minute);

        if (
            Number.isNaN(parsedHour) ||
            Number.isNaN(parsedMinute) ||
            parsedHour < 0 ||
            parsedHour > 23 ||
            parsedMinute < 0 ||
            parsedMinute > 59
        ) {
            setError(t.selectTimeError);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const utcDate = new Date();

            utcDate.setUTCHours(parsedHour);
            utcDate.setUTCMinutes(parsedMinute);
            utcDate.setUTCSeconds(0);
            utcDate.setUTCMilliseconds(0);

            const result = await simulateTransaction({
                region,
                submittedUtcTime: utcDate.toISOString(),
            });

            setLastResult(result);

            await loadApprovedTransactions();
        } catch {
            setError(t.simulateError);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        region,
        setRegion,

        hour,
        setHour,
        minute,
        setMinute,

        approvedTransactions,
        lastResult,

        isLoading,
        error,

        language,
        setLanguage,
        t,

        submitTransaction,
    };
}

export default useTransactions;