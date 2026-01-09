export interface Exchange {
    id: string;
    name: string;
    logo: string;
    type: 'CEX' | 'DEX';
    makerFee: string;
    takerFee: string;
    swapFee?: string;
    withdrawalFee?: string;
    nativeToken?: string;
    features: string[];
    url: string;
}
