import * as bip39 from 'bip39';
import nacl from 'tweetnacl';
import { Buffer } from 'buffer';

export class OctraKeyring {
    static DERIVATION_PATH = "m/44'/345'/0'/0/0";
    static generateMnemonic() { return bip39.generateMnemonic(); }
    static async fromMnemonic(mnemonic) {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const keyPair = nacl.sign.keyPair.fromSeed(new Uint8Array(seed.slice(0, 32)));
        return {
            address: this.publicKeyToAddress(keyPair.publicKey),
            publicKey: Buffer.from(keyPair.publicKey).toString('base64'),
            privateKey: Buffer.from(keyPair.secretKey.slice(0, 32)).toString('base64')
        };
    }
    static publicKeyToAddress(publicKey) {
        const hex = Buffer.from(publicKey).toString('hex').slice(0, 40);
        return `oct${hex}`;
    }
    static sign(data, privateKeyB64) {
        const privateKey = new Uint8Array(Buffer.from(privateKeyB64, 'base64'));
        const keyPair = nacl.sign.keyPair.fromSeed(privateKey);
        const messageBytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
        const signature = nacl.sign.detached(messageBytes, keyPair.secretKey);
        return Buffer.from(signature).toString('base64');
    }
}