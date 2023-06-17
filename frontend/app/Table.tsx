import React, { useState } from "react";
import Image from "next/image";

type TableRow = {
  id: number;
  name: string;
  title: string;
  dimensions: string;
  date: number;
  thumbnail_url: string;
};

type TableProps = {
  data: TableRow[];
  handleDelete: (_id: string) => void;
};

function Table(props: TableProps) {
  const { data, handleDelete } = props;

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Artist</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Dimensions</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Thumbnail URL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td className="border px-4 py-2">{row.name}</td>
            <td className="border px-4 py-2">{row.title}</td>
            <td className="border px-4 py-2">{row.dimensions}</td>
            <td className="border px-4 py-2">{row.date}</td>
            <td className="border px-4 py-2">
              <Image
                src={row.thumbnail_url}
                alt="thumbnail url"
                width={200}
                height={100}
              />
            </td>
            <td className="border px-4 py-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => handleDelete(row.id.toString())}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
