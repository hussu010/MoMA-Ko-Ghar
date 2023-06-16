import { Request, Response, NextFunction } from "express";
import { getArtworks, searchArtworks } from "./artworks.service";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 100 } = req.query;

    const safeLimit = Math.min(100, Number(limit));
    const offset = (Number(page) - 1) * safeLimit;

    const artworks = await getArtworks(safeLimit, offset);

    return res.status(200).json(artworks);
  } catch (error) {
    next(error);
  }
};

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { artist } = req.query;

    const artworks = await searchArtworks(artist as string);

    return res.status(200).json(artworks);
  } catch (error) {
    next(error);
  }
};

export { getAll, search };
