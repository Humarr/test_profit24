// lib/redisClient.ts
import { Redis } from '@upstash/redis';

// export const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });
export const redis = new Redis({
    url: 'https://stable-ant-30401.upstash.io',
    token: 'AXbBAAIjcDFjMzFiNDhhYzgyMWM0OWQzOWVkNmMwYjYwNjhjOTY4NXAxMA',
});

// export const redis = Redis.fromEnv()

// import Redis from "ioredis"

// const client = new Redis(process.env.REDIS_URL!);
// export const redis = client;
