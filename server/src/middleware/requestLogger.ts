import { FastifyRequest, FastifyReply } from "fastify";
import crypto from "crypto";
import { countRequest } from "../lib/metrics";


export async function requestLogger(req: FastifyRequest, res: FastifyReply) {
    const requestId = crypto.randomUUID();
    (req as any).requestId = requestId;

    countRequest(req.url);
    req.log.info({ requestId, method: req.method, url: req.url }, "Request received");
}
