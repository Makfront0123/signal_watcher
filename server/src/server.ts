import 'dotenv/config';
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { watchlistRoutes } from "./routes/watchlistsRoutes";
import { eventRoutes } from "./routes/eventsRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

async function buildServer() {
    const fastify = Fastify({
        logger: true,
    });


    await fastify.register(cors, {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
        preflight: true,
    });



    await fastify.register(helmet);

    fastify.addHook("onRequest", requestLogger);
    fastify.setErrorHandler(errorHandler);


    await watchlistRoutes(fastify);
    await eventRoutes(fastify);

    return fastify;
}


buildServer()
    .then((app) => {
        const port = process.env.PORT ? Number(process.env.PORT) : 3001;
        app.listen({ port, host: "0.0.0.0" }, (err, address) => {
            if (err) {
                app.log.error(err);
                process.exit(1);
            }
            console.log(`🚀 Server running at ${address}`);
        });
    })
    .catch((err) => {
        console.error("Error starting server:", err);
        process.exit(1);
    });
