export interface Exchange {
    id: string; // Used for unique keys
    exchange_rank: string;
    exchange_name: string;
    exchange_trustscore?: string;
    exchange_marketshare?: string;
    type: 'CEX' | 'DEX';
    // Removed old fields that are not in the new prompt requirement
    // But keeping id for React keys
}
