import { NextApiResponse, NextApiRequest } from "next";
import get_item from "../../data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") return res.status(404).end("Method Not Allowed");
  const path = req.query.path + "";
  const item = await get_item(path);
  return res.status(200).json(item);
}
