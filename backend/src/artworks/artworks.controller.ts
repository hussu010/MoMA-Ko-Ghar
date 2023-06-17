import { Request, Response, NextFunction } from "express";
import { getArtworks, removeArtwork } from "./artworks.service";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 100, artist } = req.query;

    const safeLimit = Math.min(100, Number(limit));
    const offset = (Number(page) - 1) * safeLimit;

    const artworks = await getArtworks(safeLimit, offset, artist as string);

    return res.status(200).json(artworks);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await removeArtwork(id);

    return res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
};

export { getAll, remove };
