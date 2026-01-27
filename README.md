# Qiubit Developer Ecosystem

<div align="center">
  <table>
    <tr>
      <td align="center" width="150">
        <img src="./public/qiubit-logo.svg" alt="Qiubit Wallet" width="100" />
        <br />
        <b>Qiubit Wallet</b>
      </td>
      <td align="center" width="50">
        <h1>for</h1>
      </td>
      <td align="center" width="150">
        <img src="./public/octra-icon.svg" alt="Octra Network" width="100" />
        <br />
        <b>Octra Network</b>
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <h3>Official SDKs & Libraries</h3>
</div>

Welcome to the **Qiubit** SDK monorepo. This folder contains all the necessary tools for developers to build decentralized applications (dApps) on the Octra Network.

---

## 📦 Available Packages

| Package | Version | Description |
| :--- | :--- | :--- |
| **[`wallet-provider`](./octra-wallet-provider)** | v1.0.0 | **Standard Connection Kit.** The easiest way to connect dApps to Qiubit Wallet. Provides a unified `window.octra` bridge for all frameworks. |
| **[`octra-sdk`](./octra-sdk)** | v0.2.0 | The core JavaScript/TypeScript SDK for connecting dApps to Octra Wallet. Use this for standard JS frameworks (Vue, Svelte, Angular). |
| **[`octra-react`](./octra-react)** | v0.1.0 | A collection of React Hooks (`useConnect`, `useAccount`) and pre-styled UI components (`<ConnectButton />`) for rapid dApp development. |
| **[`octra-core`](./octra-core)** | v1.0.0 | The low-level cryptographic engine. Contains `Keyring`, `Vault`, and `Transaction` modules. Use this if you are building your own wallet app. |

---

## 🚀 Quick Start (Installation)

### Option 1: Install from GitHub
You can install specific packages directly into your project:

```bash
# Install SDK
npm install github:QiubitLabs/Qiubit-sdk#main:packages/octra-sdk

# Install React Hooks
npm install github:QiubitLabs/Qiubit-sdk#main:packages/octra-react
```

### Option 2: Local Development
If you have cloned this repo locally:

```bash
cd my-dapp
npm install /path/to/Qiubit-sdk/packages/octra-sdk
```

---

<div align="center">
  <p>Maintained by the <b>Qiubit Labs</b></p>
  <a href="https://x.com/qiubitlabs">
    <img src="https://img.shields.io/badge/X-QiubitLabs-black.svg?logo=x" alt="X (Twitter)" />
  </a>
</div>