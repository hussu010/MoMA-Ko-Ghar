import pool from "../config/database";

const getArtworks = async (limit: number, offset: number) => {
  try {
    const artworks = await pool.query(
      "SELECT * from artworks LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    return artworks.rows;
  } catch (error) {
    throw error;
  }
};

const searchArtworks = async (artist: string) => {
  try {
    const artworks = await pool.query(
      "SELECT * from artworks \
      LEFT JOIN artists ON artworks.constituent_id = artists.constituent_id \
      WHERE artists.name ILIKE $1 \
      LIMIT 100",
      [artist]
    );
    return artworks.rows;
  } catch (error) {
    throw error;
  }
};

export { getArtworks, searchArtworks };
