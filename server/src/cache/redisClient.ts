import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,  
});

redis.on("connect", () => console.log("Redis conectado"));
redis.on("error", (err) => console.error("Error Redis:", err));

export default redis;


