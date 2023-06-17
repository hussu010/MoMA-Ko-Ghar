import pool from "../config/database";

const getArtworks = async (limit: number, offset: number, artist: string) => {
  try {
    let queryText = "";
    let queryValues = [];

    if (artist) {
      queryText =
        "SELECT artworks.id, title, dimensions, date, thumbnail_url, artists.name \
        FROM artworks, artists \
        WHERE artists.name ILIKE $3 \
        AND artworks.constituent_id = artists.constituent_id \
        LIMIT $1 OFFSET $2";
      queryValues = [limit, offset, artist];
    } else {
      queryText =
        "SELECT artworks.id, title, dimensions, date, thumbnail_url, artists.name \
        FROM artworks, artists \
        WHERE artworks.constituent_id = artists.constituent_id \
        LIMIT $1 OFFSET $2";
      queryValues = [limit, offset];
    }

    const artworks = await pool.query(queryText, queryValues);

    return artworks.rows;
  } catch (error) {
    throw error;
  }
};

const removeArtwork = async (id: string) => {
  try {
    const queryText = "DELETE FROM artworks WHERE id = $1";
    const queryValues = [id];

    await pool.query(queryText, queryValues);
  } catch (error) {
    throw error;
  }
};

export { getArtworks, removeArtwork };
