import Cors from "cors";
import { NextApiResponse, NextApiRequest } from "next";
import { getDirectoryInfo } from "../../data";

export const enable_cors = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    Cors({ methods: ["GET", "HEAD"] })(req, res, (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await enable_cors(req, res);
  if (req.method != "GET") {
    return res.status(404).end("Method Not Allowed");
  }
  const path = req.query.path + "";
  console.log("[DEBUG] -> path ", path);
  const item = await getDirectoryInfo(path);
  return res.status(200).json(item);
}
