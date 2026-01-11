import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

async function getGeminiData(prompt, apiKey) {
    const ai = new GoogleGenAI({
        apiKey: apiKey,
    });
    const config = {
        thinkingConfig: {
            thinkingLevel: 'MEDIUM',
        },
        mediaResolution: 'MEDIA_RESOLUTION_UNSPECIFIED',
    };
    const model = 'gemini-3-flash-preview';

    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];

    let fullText = "";
    try {
        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        for await (const chunk of response) {
            fullText += chunk.text;
        }

        const cleanedText = fullText.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanedText);
    } catch (e) {
        console.error("Error with Gemini 3 response:", e);
        throw e;
    }
}

async function syncExchanges() {
    console.log("Starting data synchronization using Gemini 3 Flash Preview (Thinking Enabled)...");

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_key_here' || apiKey.length < 10) {
        console.error("Error: GEMINI_API_KEY is missing or invalid in .env or .env.local");
        console.log("Detected Env Keys starting with 'GEMINI' or 'NEXT_PUBLIC_GEMINI':",
            Object.keys(process.env).filter(k => k.includes('GEMINI'))
        );
        return;
    }

    try {
        // ... prompt definitions ...
        const cexPrompt = `Scrape or find Top Cryptocurrency Spot Centralized Exchanges lists from top respected providers that provides refined and ranked Spot Centralized Exchanges lists and provide me top rank of 50 exchanges and return list in JSON.
Data fields required: "Rank" (#), "Exchange name". Data fields if exists "Trust Score".
Output: Return only a JSON array. No preamble, no explanation, no markdown text outside the JSON.
Schema:
[
{
"exchange_rank": "string",
"exchange_name": "string",
"exchange_trustscore": "string"
}
]`;

        const dexPrompt = `Scrape or find Top Cryptocurrency Spot Decentralized Exchanges lists from top respected providers that provides refined and ranked Spot Decentralized Exchanges lists and provide me top rank of 50 exchanges and return list in JSON.
Data fields required: "Rank" (#), "Exchange name". Data fields if exists "Trust Score", "% Market Share".
Output: Return only a JSON array. No preamble, no explanation, no markdown text outside the JSON.
Schema:
[
{
"exchange_rank": "string",
"exchange_name": "string",
"exchange_trustscore": "string",
"exchange_marketshare": "string"
}
]`;

        console.log("Fetching CEX data from Gemini 3...");
        const rawCex = await getGeminiData(cexPrompt, apiKey);
        const cexData = rawCex.map(item => ({
            ...item,
            id: `cex-${item.exchange_rank}-${item.exchange_name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
            type: 'CEX'
        }));

        console.log("Fetching DEX data from Gemini 3...");
        const rawDex = await getGeminiData(dexPrompt, apiKey);
        const dexData = rawDex.map(item => ({
            ...item,
            id: `dex-${item.exchange_rank}-${item.exchange_name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
            type: 'DEX'
        }));

        const exchanges = [...cexData, ...dexData];

        const dataPath = path.join(process.cwd(), 'public', 'data', 'exchanges.json');

        const dir = path.dirname(dataPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(dataPath, JSON.stringify(exchanges, null, 2));

        console.log(`Successfully synced ${exchanges.length} exchanges to ${dataPath}`);
    } catch (error) {
        console.error("Failed to sync data:", error);
    }
}

syncExchanges().catch(console.error);
