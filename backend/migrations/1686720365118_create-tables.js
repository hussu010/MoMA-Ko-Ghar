exports.up = (pgm) => {
  pgm.createTable("artists", {
    id: "id",
    constituent_id: { type: "integer", notNull: true, unique: true },
    name: { type: "varchar(1024)", notNull: true },
    bio: { type: "varchar(1024)" },
    nationality: { type: "varchar(1024)", notNull: true },
    gender: { type: "varchar(1024)", notNull: true },
    begin_date: { type: "varchar(1024)", notNull: true },
    end_date: { type: "varchar(1024)", notNull: true },
    wiki_qid: { type: "varchar(1024)" },
    ulan: { type: "varchar(1024)" },
  });
  pgm.createTable("artworks", {
    id: "id",
    title: { type: "varchar(1024)", notNull: true },
    constituent_id: { type: "integer", notNull: true },
    date: { type: "varchar(1024)", notNull: true },
    medium: { type: "varchar(2048)", notNull: true },
    dimensions: { type: "varchar(4096)", notNull: true },
    credit_line: { type: "varchar(1024)", notNull: true },
    accession_number: { type: "varchar(1024)", notNull: true },
    classification: { type: "varchar(1024)", notNull: true },
    department: { type: "varchar(1024)", notNull: true },
    date_acquired: { type: "varchar(1024)", notNull: true },
    cataloged: { type: "varchar(1024)", notNull: true },
    object_id: { type: "varchar(1024)", notNull: true },
    url: { type: "varchar(1024)", notNull: true },
    thumbnail_url: { type: "varchar(1024)", notNull: true },
    circumference: { type: "varchar(1024)" },
    depth: { type: "varchar(1024)" },
    diameter: { type: "varchar(1024)" },
    height: { type: "varchar(1024)" },
    length: { type: "varchar(1024)" },
    weight: { type: "varchar(1024)" },
    width: { type: "varchar(1024)" },
    seat_height: { type: "varchar(1024)" },
    duration: { type: "varchar(1024)" },
  });
  pgm.addConstraint("artworks", "fk_artworks_constituent_id", {
    foreignKeys: {
      columns: "constituent_id",
      references: "artists(constituent_id)",
    },
  });
  pgm.createIndex("artworks", "constituent_id");
};

exports.down = (pgm) => {
  pgm.dropConstraint("artworks", "fk_artworks_constituent_id");
  pgm.dropIndex("artworks", "constituent_id");
  pgm.dropTable("artists");
  pgm.dropTable("artworks");
};
