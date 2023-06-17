import { useState, useEffect } from "react";

type SearchProps = {
  handleSearch: (title: string) => void;
};

function Search({ handleSearch }: SearchProps) {
  const [searchTitle, setSearchTitle] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchTitle);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex items-center">
        <div className="flex border border-purple-200 rounded">
          <input
            type="text"
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search by artist"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <input
            className="px-4 text-white bg-purple-600 border-l rounded"
            type="submit"
            value="Search"
          />
        </div>
      </div>
    </form>
  );
}

export default Search;
