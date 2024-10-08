# Crypto Sentiment Analysis

This project is a web application that provides sentiment analysis for cryptocurrency projects. It uses OpenAI's GPT-4 model to analyze sentiment across various sources including social media, market data, and technical analysis.

## Features

- Sentiment analysis for any cryptocurrency project (default: DOT/Polkadot)
- Analysis across multiple sources: Twitter, Reddit, and Coinbase
- Provides a sentiment breakdown, overall sentiment, and investment recommendation
- Real-time streaming of AI-generated analysis

## Tech Stack

- Frontend: Next.js with React
- Backend: Next.js API Routes
- AI: OpenAI GPT-4
- Styling: Tailwind CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- An OpenAI API key

## Installation

1. Clone the repository:

   ```git clone https://github.com/Encode-Group16-AI-bootcamp-Q3-2024/finalProject-Group16
   cd crypto-sentiment-analysis
   ```

2. Install the dependencies:

   ```npm install
   ```

   or if you're using yarn:

   ```yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

   ```OPENAI_API_KEY=your_api_key_here
   ```

## Running the Application

1. Start the development server:

   ```npm run dev
   ```

   or with yarn:

   ```yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter the name of a cryptocurrency project in the input field (default is DOT for Polkadot).
2. Click the "Analyze Sentiment" button.
3. Wait for the AI to generate the sentiment analysis.
4. Review the detailed breakdown of sentiment across different sources, overall sentiment, and investment recommendation.

## Contributing

Contributions to the Crypto Sentiment Analysis project are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the GPT-4 model
- Vercel for Next.js and hosting solutions
- The open-source community for various tools and libraries used in this project
