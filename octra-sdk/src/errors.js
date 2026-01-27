/**
 * Octra SDK Error Codes
 * Standardized error codes for dApp handling
 */

export const OctraErrors = {
    USER_REJECTED: {
        code: 4001,
        message: 'User rejected the request.'
    },
    UNAUTHORIZED: {
        code: 4100,
        message: 'The requested method and/or account has not been authorized by the user.'
    },
    UNSUPPORTED_METHOD: {
        code: 4200,
        message: 'The Provider does not support the requested method.'
    },
    DISCONNECTED: {
        code: 4900,
        message: 'The Provider is disconnected from all chains.'
    },
    CHAIN_DISCONNECTED: {
        code: 4901,
        message: 'The Provider is not connected to the requested chain.'
    },
    INTERNAL_ERROR: {
        code: -32603,
        message: 'Internal JSON-RPC error.'
    }
};

export class ProviderError extends Error {
    constructor(code, message, data) {
        super(message);
        this.code = code;
        this.data = data;
        this.name = 'ProviderError';
    }
}
