import { NextApiRequest, NextApiResponse } from "next";
import get_file_item from "../../data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { dir } = req.query;
  const state = await get_file_item(dir + "");
  return res.status(200).json(state);
}
