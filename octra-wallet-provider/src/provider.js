/**
 * Qiubit Wallet Provider
 * Standard interface for dApps to interact with the window.octra provider
 */

export class QiubitProvider {
    constructor() {
        this._provider = null;
        this._isConnected = false;
        this._selectedAddress = null;
        this._listeners = new Map();

        this._initialize();
    }

    _initialize() {
        if (typeof window !== 'undefined') {
            if (window.octra) {
                this._provider = window.octra;
                this._updateState();
            } else {
                window.addEventListener('octra#initialized', () => {
                    this._provider = window.octra;
                    this._updateState();
                    this.emit('installed', { provider: this._provider });
                });
            }
        }
    }

    _updateState() {
        if (this._provider) {
            this._isConnected = this._provider.isConnected;
            this._selectedAddress = this._provider.selectedAddress;
        }
    }

    /**
     * Check if Qiubit Wallet extension is installed
     */
    isInstalled() {
        return !!(typeof window !== 'undefined' && window.octra);
    }

    /**
     * Connect to the wallet
     */
    async connect(options = {}) {
        if (!this.isInstalled()) {
            throw new Error('Qiubit Wallet not found. Please install the extension.');
        }

        const result = await window.octra.connect(options);
        this._updateState();
        return result;
    }

    /**
     * Disconnect from the wallet
     */
    async disconnect() {
        if (!this.isInstalled()) return;
        await window.octra.disconnect();
        this._updateState();
    }

    /**
     * Get current connected accounts
     */
    async getAccounts() {
        if (!this.isInstalled()) return [];
        return await window.octra.getAccounts();
    }

    /**
     * Sign a message (OSM-1 standard)
     */
    async signMessage(message) {
        if (!this.isInstalled()) throw new Error('Wallet not installed');
        return await window.octra.signMessage(message);
    }

    /**
     * Send a transaction (OTX-1 standard)
     */
    async sendTransaction(params) {
        if (!this.isInstalled()) throw new Error('Wallet not installed');
        return await window.octra.sendTransaction(params);
    }

    /**
     * Get current state
     */
    getState() {
        return {
            isConnected: this._isConnected,
            selectedAddress: this._selectedAddress,
            isInstalled: this.isInstalled()
        };
    }

    // Event System
    on(event, callback) {
        if (!this._listeners.has(event)) {
            this._listeners.set(event, []);
        }
        this._listeners.get(event).push(callback);

        // Also register with the underlying provider if it exists
        if (this._provider && typeof this._provider.on === 'function') {
            this._provider.on(event, callback);
        }
    }

    off(event, callback) {
        const listeners = this._listeners.get(event);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }

        if (this._provider && typeof this._provider.off === 'function') {
            this._provider.off(event, callback);
        }
    }

    emit(event, data) {
        const listeners = this._listeners.get(event);
        if (listeners) {
            listeners.forEach(cb => cb(data));
        }
    }
}

// Export singleton instance
export const qiubit = new QiubitProvider();
export default qiubit;
