# Qiubit Wallet SDK (@octra/sdk)

The official library to connect your website to Qiubit Wallet on the Octra Network.

## Installation

```bash
# Since this is not on NPM yet, install via GitHub or Local Path
npm install QiubitLabs/Qiubit-sdk#main:packages/octra-sdk
```

## Quick Start

```javascript
import octra, { utils } from 'octra-sdk';

// 1. Connect
const account = await octra.connect();

// 2. Sign In
const login = await octra.signInWithOctra("My App");

// 3. Send OCT
const tx = await octra.sendTransaction({
  to: "oct...",
  amount: utils.parseOct("1.0")
});
```
