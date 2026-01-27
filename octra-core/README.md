# Octra Core SDK

The low-level engine for building Octra-compatible wallets, CLI tools, and automated bots.

## Installation

```bash
npm install octra-core
```

## Features

### 1. Key Management
Generate Mnemonics and derive Octra addresses.

```javascript
import { OctraKeyring } from 'octra-core';

// Create a new wallet
const mnemonic = OctraKeyring.generateMnemonic();
const wallet = await OctraKeyring.fromMnemonic(mnemonic);

console.log(wallet.address);    // oct...
console.log(wallet.privateKey); // base64...
```

### 2. Secure Vault
Encrypt and decrypt wallet data using industry-standard PBKDF2 + AES-GCM.

```javascript
import { OctraVault } from 'octra-core';

// Save wallet safely
const encryptedVault = await OctraVault.encrypt(wallet, "user-password");

// Restore wallet
const restoredWallet = await OctraVault.decrypt(encryptedVault, "user-password");
```

### 3. Signing
Sign transactions and messages offline.

```javascript
const signature = OctraKeyring.sign(myTransaction, wallet.privateKey);
```

## Protocol Support
- OSM-1 (Octra Sign Message)
- OTX-1 (Octra Transaction)
- Ed25519 Curve
