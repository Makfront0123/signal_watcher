import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function errorHandler(error: FastifyError, req: FastifyRequest, res: FastifyReply) {
  const requestId = (req as any).requestId;  
  req.log.error({ requestId, error }, "Unhandled error");
  res.status(error.statusCode || 500).send({
    error: error.message || "Internal Server Error",
    requestId,
  });
}
