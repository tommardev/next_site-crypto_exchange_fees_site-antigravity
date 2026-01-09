import { Exchange } from '../types/exchange';

export const fetchExchanges = async (type?: 'CEX' | 'DEX'): Promise<Exchange[]> => {
    try {
        // Simulate API delay for skeleton loading demo
        await new Promise(resolve => setTimeout(resolve, 800));

        const response = await fetch('/data/exchanges.json');
        if (!response.ok) throw new Error('Failed to fetch data');

        const data: Exchange[] = await response.json();

        if (type) {
            return data.filter(e => e.type === type);
        }
        return data;
    } catch (error) {
        console.error('Error fetching exchanges:', error);
        return [];
    }
};
