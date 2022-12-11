import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") return res.status(404).end("Method Not Allowed");
  res.end("Start shutting down ...");
  res.on("end", () => process.exit(0));
}
