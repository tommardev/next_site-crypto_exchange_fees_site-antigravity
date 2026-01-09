import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function syncExchanges() {
    console.log("Starting data synchronization with expanded mock data...");

    const exchanges = [
        {
            id: 'binance',
            name: 'Binance',
            logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
            type: 'CEX',
            makerFee: '0.1%',
            takerFee: '0.1%',
            features: ['Futures', 'Staking', 'Launchpad'],
            url: 'https://binance.com'
        },
        {
            id: 'coinbase',
            name: 'Coinbase',
            logo: 'https://cryptologos.cc/logos/coinbase-coin-logo.png',
            type: 'CEX',
            makerFee: '0.4%',
            takerFee: '0.6%',
            features: ['Custody', 'Prime', 'Wallet'],
            url: 'https://coinbase.com'
        },
        {
            id: 'kraken',
            name: 'Kraken',
            logo: 'https://cryptologos.cc/logos/kraken-krw-logo.png',
            type: 'CEX',
            makerFee: '0.16%',
            takerFee: '0.26%',
            features: ['Margin', 'OTC', 'Staking'],
            url: 'https://kraken.com'
        },
        {
            id: 'kucoin',
            name: 'KuCoin',
            logo: 'https://cryptologos.cc/logos/kucoin-token-kcs-logo.png',
            type: 'CEX',
            makerFee: '0.1%',
            takerFee: '0.1%',
            features: ['Lending', 'Trading Bot', 'Spot'],
            url: 'https://kucoin.com'
        },
        {
            id: 'gateio',
            name: 'Gate.io',
            logo: 'https://cryptologos.cc/logos/gate-token-gt-logo.png',
            type: 'CEX',
            makerFee: '0.2%',
            takerFee: '0.2%',
            features: ['Startup', 'Copy Trading', 'Options'],
            url: 'https://gate.io'
        },
        {
            id: 'uniswap',
            name: 'Uniswap (v3)',
            logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
            type: 'DEX',
            makerFee: '0%',
            takerFee: '0.3%',
            swapFee: '0.3%',
            features: ['Multi-chain', 'Governance', 'L2 Support'],
            url: 'https://uniswap.org'
        },
        {
            id: 'pancakeswap',
            name: 'PancakeSwap',
            logo: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png',
            type: 'DEX',
            makerFee: '0%',
            takerFee: '0.25%',
            swapFee: '0.25%',
            features: ['IFO', 'Lottery', 'NFT Market'],
            url: 'https://pancakeswap.finance'
        },
        {
            id: 'raydium',
            name: 'Raydium',
            logo: 'https://cryptologos.cc/logos/raydium-ray-logo.png',
            type: 'DEX',
            makerFee: '0%',
            takerFee: '0.25%',
            swapFee: '0.25%',
            features: ['Solana Ecosystem', 'Serum Integration', 'Yield'],
            url: 'https://raydium.io'
        },
        {
            id: 'sushiswap',
            name: 'SushiSwap',
            logo: 'https://cryptologos.cc/logos/sushiswap-sushi-logo.png',
            type: 'DEX',
            makerFee: '0%',
            takerFee: '0.3%',
            swapFee: '0.3%',
            features: ['BentoBox', 'Kashi Lending', 'Onsen'],
            url: 'https://sushi.com'
        },
        {
            id: 'curve',
            name: 'Curve Finance',
            logo: 'https://cryptologos.cc/logos/curve-dao-token-crv-logo.png',
            type: 'DEX',
            makerFee: '0%',
            takerFee: '0.04%',
            swapFee: '0.04%',
            features: ['Stablecoin focus', 'Low slippage', 'Gauge voting'],
            url: 'https://curve.fi'
        }
    ];

    const dataPath = path.join(process.cwd(), 'public', 'data', 'exchanges.json');

    // Ensure the directory exists
    const dir = path.dirname(dataPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(dataPath, JSON.stringify(exchanges, null, 2));

    console.log(`Successfully synced ${exchanges.length} exchanges to ${dataPath}`);
}

syncExchanges().catch(console.error);
