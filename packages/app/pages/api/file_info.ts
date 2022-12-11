import { NextApiResponse, NextApiRequest } from "next";
import get_file_item from "../../data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") return res.status(404).end("Method Not Allowed");
  const { dir, id } = req.query;
  const item = await get_file_item(dir + "", (id || "") + "");
  return res.status(200).json(item);
}
