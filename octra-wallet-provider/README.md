# @octra/wallet-provider

The official standard provider for connecting dApps to the **Qiubit Wallet** (Octra Network).

## Installation

```bash
npm install @octra/wallet-provider
```

## Quick Start

```javascript
import qiubit from '@octra/wallet-provider';

async function connectWallet() {
  if (!qiubit.isInstalled()) {
    alert('Please install Qiubit Wallet extension!');
    return;
  }

  try {
    const { accounts } = await qiubit.connect({
      appInfo: { name: 'My Amazing dApp' }
    });
    console.log('Connected address:', accounts[0]);
  } catch (err) {
    console.error('User rejected connection', err);
  }
}
```

## API Reference

### `qiubit.isInstalled()`
Returns `true` if the Qiubit extension is detected in the browser.

### `qiubit.connect(options)`
Requests wallet connection. Returns a promise that resolves with connection details or rejects if the user cancels.

### `qiubit.signMessage(payload)`
Requests a message signature (OSM-1 standard).

### `qiubit.sendTransaction(txParams)`
Requests a transaction to be signed and broadcasted (OTX-1 standard).

### Events

```javascript
qiubit.on('connect', ({ accounts }) => {
  console.log('Account changed to:', accounts[0]);
});

qiubit.on('disconnect', () => {
  console.log('Wallet disconnected');
});
```

## Security
This provider acts as a lightweight bridge to the secure `window.octra` interface provided by the Qiubit extension. No private keys ever leave the extension environment.
