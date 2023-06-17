"use client";
import { Inter } from "next/font/google";

import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";

import Table from "./Table";
import Search from "./Search";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState("");
  const [symbol, setSymbol] = useState("");
  const [entry, setEntry] = useState(0);
  const [target, setTarget] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [exit, setExit] = useState(0);
  const [status, setStatus] = useState("OPEN");
  const [page, setPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");

  const API_BASE_URI = "http://127.0.0.1:4200";

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URI}/artworks/?page=${page}&artist=${searchTitle}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [page, searchTitle]);

  const handleEdit = (
    editId: string,
    title: string,
    dimensions: string,
    date: number,
    thumbnail_url: string
  ) => {
    setIsEditing(true);
    setEditId(editId);
    setSymbol(symbol);
    setEntry(entry);
    setTarget(target);
    setStopLoss(stopLoss);
    setExit(exit);
    setStatus(status);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (!confirmDelete) {
      return;
    }

    setLoading(true);

    const response = await fetch(`${API_BASE_URI}/artworks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      window.alert("Failed to delete the artwork");
      return;
    }

    fetch(`${API_BASE_URI}/artworks`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestUrl = isEditing
      ? `${API_BASE_URI}/artworks/${editId}`
      : `${API_BASE_URI}/artworks`;

    const requestOptions = {
      method: isEditing ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol, entry, target, stopLoss, exit, status }),
    };

    const response = await fetch(requestUrl, requestOptions);

    if (!response.ok) {
      window.alert(`Failed to update artwork. Status ${response.status}`);
      return;
    }

    window.alert(`Artwork ${response.statusText} successfully`);

    setShowForm(false);
    setEditId("");
    setSymbol("");
    setEntry(0);
    setTarget(0);
    setStopLoss(0);
    setExit(0);
    setStatus("OPEN");
    setIsEditing(false);

    fetch(`${API_BASE_URI}/artworks`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No artists data</p>;

  const handleSearch = (title: string) => {
    setSearchTitle(title);
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-4 text-center py-5">Artworks</h1>
        <Search handleSearch={handleSearch} />
        <Table data={data} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
