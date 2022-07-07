import React, { useCallback } from 'react';
import axios from '@/axios';

function deepEqual(object1, object2) {
    if (!isObject(object1) || !isObject(object2)) {
        return false;
    }

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }

    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}

export const useQuery = (url, options) => {
    const [params, setParams] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const mountedRef = React.useRef(true)

    const fetchData = useCallback(() => {
        const variables = options?.variables ?? null;
        mountedRef.current = true;
        axios
            .post(url, variables)
            .then((response) => {
                // console.log(mountedRef.current);
                if (!mountedRef.current) return null;
                const data = response?.data ?? null;

                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                if (!mountedRef.current) return null;
                setError(err);
                setLoading(false);
            })
            .finally(() => {
                if (!mountedRef.current) return null;
                setLoading(false);
            });
    }, [options, url]);

    React.useEffect(async () => {
        if (!deepEqual(options, params)) {
            
            // console.log(options);
            setParams(options);
            setLoading(true);
            await fetchData();
        }
        
        // cancel subscription to useEffect
        return () => {
            mountedRef.current = false;
        }
    // eslint-disable-next-line
    }, [params, options]);

    // custom hook returns value
    return { data, error, loading, refetch: () => {
        setLoading(true);
        fetchData();
    }};
};