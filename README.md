# Magic Example

This example shows how to use [Magic](https://magic.link) with Next.js. The example features cookie-based, passwordless authentication with email-based magic links.

The example shows how to do a login and logout; and to get the user info using a hook with [SWR](https://swr.vercel.app).

The login cookie is `httpOnly`, meaning it can only be accessed by the API, and it's encrypted as a jwt.

## How to use

```bash
git clone https://github.com/sch0lar-io/Sch0lar-authenticated-frontend.git
npm install
```

## Configuration

Login to the [Magic Dashboard](https://dashboard.magic.link/) and get the keys of your application

![Magic Dashboard](https://gblobscdn.gitbook.com/assets%2F-M1XNjqusnKyXZc7t7qQ%2F-M3HsSftOAghkNs-ttU3%2F-M3HsllfdwdDmeFXBK3U%2Fdashboard-pk.png?alt=media&token=4d6e7543-ae20-4355-951c-c6421b8f1b5f)

Next, copy the `.env.local.example` file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY` should look like `pk_test_abc` or `pk_live_ABC`
- `MAGIC_SECRET_KEY` should look like `sk_test_ABC` or `sk_live_ABC`
- `TOKEN_SECRET` should be a string with at least 32 characters
- `NEXT_PUBLIC_RPC_AVALANCHE` should be defined, but can be modified if you have another RPC to use

Now, run Next.js in development mode

```bash
npm run dev
# or
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)!
