# Deploying to Vercel

This project is a Next.js app targeting Vercel. Follow these steps to deploy and verify.

## 1. Prepare environment variables

Set these environment variables in the Vercel dashboard (Project → Settings → Environment Variables):

- FIREBASE_API_KEY (if using Firebase)
- FIREBASE_AUTH_DOMAIN
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_APP_ID
- Any API keys for genkit/AI providers (for example: GENKIT_API_KEY)

Make sure you set them for `Preview` and `Production` as appropriate.

## 2. Build & Runtime settings

Vercel will automatically detect this is a Next.js app and run `npm run build`.

If you need to set the Node.js version, configure the `engines` field in `package.json` or set `NODE_VERSION` in the Vercel settings.

## 3. Static file & Image domains

`next.config.ts` already configures `images.remotePatterns` for `firebasestorage.googleapis.com` and `placehold.co`. If you add external image hosts, add them to `remotePatterns`.

## 4. Optional settings

- If you use server-side environment-specific behavior, consider using `NEXT_PUBLIC_` prefixed environment variables for values that must be available client-side.
- If you rely on a custom `postcss.config.mjs` or Tailwind features, ensure `tailwindcss` and `postcss` are present in `devDependencies` or `dependencies`.

## 5. Deploy

1. Push your branch to GitHub.
2. Create/import the project in Vercel and connect the GitHub repo.
3. Configure environment variables in the Vercel dashboard.
4. Trigger a deployment: Vercel will run the build and show logs.

## Troubleshooting

- If the build fails on Vercel, open the build logs, copy the failing stack, and paste here so I can diagnose and fix quickly.
- Common issues: missing env vars, image domains not allowed, tailwind/postcss misconfiguration, or TypeScript errors when `ignoreBuildErrors` is disabled.

---

If you want, I can also:

- Create a `vercel` git remote in the repo and show the exact `vercel` CLI commands to deploy from your machine.
- Add a small `now.json` alternative config if you need rewrites or headers.
