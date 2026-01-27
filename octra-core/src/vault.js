export class OctraVault {
    static ITERATIONS = 1000000;
    static async encrypt(data, password) {
        const encoder = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
        const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: this.ITERATIONS, hash: 'SHA-256' }, keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
        const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(JSON.stringify(data)));
        return { v: 4, data: btoa(String.fromCharCode(...new Uint8Array(ciphertext))), iv: btoa(String.fromCharCode(...iv)), salt: btoa(String.fromCharCode(...salt)) };
    }
    static async decrypt(vault, password) {
        const decoder = new TextDecoder();
        const salt = Uint8Array.from(atob(vault.salt), c => c.charCodeAt(0));
        const iv = Uint8Array.from(atob(vault.iv), c => c.charCodeAt(0));
        const ciphertext = Uint8Array.from(atob(vault.data), c => c.charCodeAt(0));
        const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
        const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: this.ITERATIONS, hash: 'SHA-256' }, keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
        const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
        return JSON.parse(decoder.decode(decrypted));
    }
}