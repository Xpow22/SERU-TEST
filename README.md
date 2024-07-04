# Next.js + PWA (Progressive Web App) Project with TypeScript, React.js, and Tailwind CSS

This project is bootstrapped with [Next.js](https://nextjs.org/), using TypeScript and Tailwind CSS, and implementing Progressive Web App [PWA](https://ducanh-next-pwa.vercel.app/docs/next-pwa/getting-started) features.

## Getting Started

First, clone the repository and navigate into the project directory:

```bash
git clone <repository-url>
cd <project-directory>

Install dependencies:

npm install
# or
yarn install
# or
pnpm install

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Progressive Web App (PWA) Features
This project implements Progressive Web App (PWA) features, allowing it to be installed on your device for offline usage and enhanced performance.

Activating PWA
Desktop (Chrome, Edge, Firefox):
Visit http://localhost:3000 in your browser.
In the address bar, look for a prompt or icon that allows you to install the app.
Click "Install" or "Add to Home screen" to install the PWA.

Mobile (Android/iOS):
Open http://localhost:3000 in your mobile browser (Chrome or Safari).
You should see a banner or prompt at the bottom asking if you want to install the app.
Follow the instructions to add the app to your home screen.
Downloading PWA
If you prefer to download the PWA directly:

Click on the browser menu (usually represented by three dots).
Look for an option like "Install" or "Add to Home screen".
Follow the prompts to download and install the app on your device.
Once installed, the PWA will be accessible directly from your device's home screen, providing an app-like experience with offline capabilities.
![pwa](/public/pwa.png)

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [https://www.emsifa.com/api-wilayah-indonesia/api/](https://www.emsifa.com/api-wilayah-indonesia/api/). 

The `service/api.ts` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
