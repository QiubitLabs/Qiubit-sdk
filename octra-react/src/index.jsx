import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import octra from 'octra-sdk';

const OctraContext = createContext(null);

export const OctraProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (octra.isInstalled()) {
            octra.on('accountChanged', (acc) => {
                if (acc) { setAccount(acc); setIsConnected(true); }
                else { setAccount(null); setIsConnected(false); }
            });
        }
    }, []);

    const connect = useCallback(async () => {
        setIsConnecting(true); setError(null);
        try {
            const acc = await octra.connect();
            setAccount(acc.address); setIsConnected(true);
        } catch (err) { setError(err); }
        finally { setIsConnecting(false); }
    }, []);

    const disconnect = useCallback(async () => {
        await octra.disconnect(); setAccount(null); setIsConnected(false);
    }, []);

    return (
        <OctraContext.Provider value={{ account, isConnected, isConnecting, error, connect, disconnect }}>
            {children}
        </OctraContext.Provider>
    );
};

export const useAccount = () => useContext(OctraContext);
export const useConnect = () => {
    const { connect, isConnecting, error } = useContext(OctraContext);
    return { connect, isConnecting, error };
};
export const useDisconnect = () => {
    const { disconnect } = useContext(OctraContext);
    return { disconnect };
};
