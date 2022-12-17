import { NextApiRequest, NextApiResponse } from "next";
import get_item from "../../data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = req.query.dir + "";
  const state = await get_item(path);
  return res.status(200).json(state);
}
