# 🚀 CryptoFees Exchange Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/bf1afe25-d08e-4c1e-a13e-57e2f9869788/deploy-status)](https://app.netlify.com/projects/cryptoexchangefees/deploys)

A modern, responsive Next.js application designed to track and compare trading fees across Centralized (CEX) and Decentralized (DEX) exchanges. Built with a focus on premium aesthetics, performance, and automated data synchronization.

## ✨ Core Features

-   **Real-time Fee Comparison**: Easily compare maker, taker, and swap fees across multiple platforms.
-   **Automated Data Sync**: Integrated script powered by structure for Google Gemini API to keep fee data accurate and up-to-date.
-   **Premium UX/UI**: Beautifully crafted with Chakra UI, featuring:
    -   **Glassmorphism Navbar**: Sticky header with blur effects.
    -   **Dark Mode**: Full support with a seamless toggle.
    -   **Skeleton Loaders**: Smooth transitions during data fetching.
    -   **Responsive Design**: Optimized for mobile, tablet, and desktop views.
-   **Smart Filtering & Sorting**: Search by exchange name or sort by fee percentage to find the best trading options quickly.
-   **Nightly Updates**: GitHub Actions pipeline that automatically refreshes exchange data every 24 hours.

## 🛠️ Technology Stack

-   **Framework**: [Next.js](https://nextjs.org/) (TypeScript)
-   **UI Library**: [Chakra UI](https://chakra-ui.com/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
-   **Automation**: GitHub Actions
-   **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)
-   **Hosting**: [Netlify](https://www.netlify.com/)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.x or later
-   npm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/next_site-crypto_exchange_fees_site.git
    cd next_site-crypto_exchange_fees_site
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file based on `.env.example`:
    ```bash
    GEMINI_API_KEY=your_actual_key_here
    ```

4.  **Sync Data**:
    Fetch the initial set of exchange data:
    ```bash
    node scripts/sync-data.mjs
    ```

5.  **Run Locally**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

### Netlify

The project is pre-configured for Netlify with `netlify.toml`. 
-   **Build Command**: `npm run build`
-   **Publish Directory**: `.next`

### GitHub Actions (Data Sync)

The nightly sync is handled by `.github/workflows/sync.yml`. Ensure you have added your `GEMINI_API_KEY` to the GitHub Repository Secrets to allow the automated updates to function.

---

Built with ❤️ for the Crypto Community.
