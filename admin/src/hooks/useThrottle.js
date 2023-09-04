import {useState, useDebugValue} from 'react';
    const useThrottle = (func, delay) => {
    const [timeout, saveTimeout] = useState(null);
    useDebugValue(delay);
    const throttledFunc = function () {
        if (timeout) {
            clearTimeout(timeout);
        }

        const newTimeout = setTimeout(() => {
            func(...arguments);
            if (newTimeout === timeout) {
                saveTimeout(null);
            }
        }, delay);
        saveTimeout(newTimeout);
    }

    return throttledFunc;
}

export default useThrottle;