/**
 * Octra Smart Contract Interaction
 */

export class Contract {
    constructor(address, abi, provider) {
        this.address = address;
        this.abi = abi;
        this.provider = provider;
        
        if (Array.isArray(abi)) {
            abi.forEach(methodName => {
                this[methodName] = async (...args) => {
                    return this.call(methodName, args);
                };
            });
        }
    }

    async call(method, params = []) {
        const txData = {
            to: this.address,
            data: JSON.stringify({
                method: method,
                params: params
            })
        };
        return this.provider.sendTransaction(txData);
    }
}