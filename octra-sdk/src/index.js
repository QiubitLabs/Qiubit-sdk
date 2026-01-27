/**
 * Octra Wallet SDK v1.0
 * The official library for integrating dApps with Qiubit Wallet
 */

import { Contract } from './contract.js';
import * as utils from './utils.js';
import { OctraErrors, ProviderError } from './errors.js';

class OctraSDK {
    constructor() {
        this.provider = null;
        this.isConnected = false;
        this.account = null;
        this.utils = utils;
        this.errors = OctraErrors;
    }

    isInstalled() {
        return typeof window !== 'undefined' && !!window.octra;
    }

    getProvider() {
        if (this.isInstalled()) {
            this.provider = window.octra;
            return this.provider;
        }
        console.warn('Qiubit Wallet not found. Please install the extension.');
        return null;
    }

    async connect() {
        const provider = this.getProvider();
        if (!provider) throw new Error('Wallet not installed');

        try {
            const result = await provider.connect();
            this.isConnected = true;
            this.account = result.selectedAddress || result.accounts[0];
            return {
                address: this.account,
                publicKey: result.publicKey,
                chainId: result.chainId
            };
        } catch (err) {
            this.isConnected = false;
            throw err;
        }
    }

    async signInWithOctra(appName = 'this dApp') {
        const provider = this.getProvider();
        if (!provider) throw new Error('Wallet not installed');

        const account = this.account || (await this.connect()).address;
        const domain = typeof window !== 'undefined' ? window.location.origin : 'unknown';
        const nonce = Math.random().toString(36).substring(2, 15);
        const timestamp = new Date().toISOString();

        const message = `Sign in to ${appName}\n\n` +
                        `Domain: ${domain}\n` +
                        `Address: ${account}\n` +
                        `Nonce: ${nonce}\n` +
                        `Time: ${timestamp}`;

        const signature = await this.signMessage({
            message,
            domain,
            nonce,
            timestamp: Date.now()
        });

        return { address: account, message, signature, nonce, timestamp };
    }

    async disconnect() {
        const provider = this.getProvider();
        if (provider) await provider.disconnect();
        this.isConnected = false;
        this.account = null;
    }

    async signMessage(message) {
        const provider = this.getProvider();
        if (!provider) throw new Error('Wallet not installed');
        return await provider.signMessage(message);
    }

    async sendTransaction(params) {
        const provider = this.getProvider();
        if (!provider) throw new Error('Wallet not installed');
        return await provider.sendTransaction(params);
    }

    Contract(address, abi) {
        const provider = this.getProvider();
        return new Contract(address, abi, provider);
    }

    on(event, callback) {
        const provider = this.getProvider();
        if (provider) provider.on(event, callback);
    }

    off(event, callback) {
        const provider = this.getProvider();
        if (provider) provider.off(event, callback);
    }
}

const octra = new OctraSDK();
export default octra;
export { OctraSDK, Contract, utils, OctraErrors, ProviderError };
