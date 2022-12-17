import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") return res.status(404).end("Method Not Allowed");
  return res.status(503).json({ message: "Not implemented" });
}
