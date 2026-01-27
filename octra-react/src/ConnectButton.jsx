import React from 'react';
import { useAccount, useConnect, useDisconnect } from './index.jsx';

export const ConnectButton = ({ label = "Connect Wallet" }) => {
    const { account, isConnected } = useAccount();
    const { connect, isConnecting } = useConnect();
    const { disconnect } = useDisconnect();

    if (isConnected) {
        return (
            <button onClick={disconnect} style={styles.connected}>
                {account.slice(0, 6)}...{account.slice(-4)}
            </button>
        );
    }

    return (
        <button onClick={connect} disabled={isConnecting} style={styles.btn}>
            {isConnecting ? "Connecting..." : label}
        </button>
    );
};

const styles = {
    btn: {
        background: '#FFFFFF',
        color: '#1A202C',
        border: '1px solid #E2E8F0',
        padding: '10px 24px',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '15px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        fontFamily: 'sans-serif'
    },
    connected: {
        background: '#F7FAFC',
        color: '#2D3748',
        border: '1px solid #E2E8F0',
        padding: '10px 24px',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '15px',
        cursor: 'pointer',
        fontFamily: 'sans-serif'
    }
};
