// Navbar.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import Logo from "../assets/flavoro.webp";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Dispatch search or reset search if empty
  useEffect(() => {
    dispatch(setSearch(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center py-3 mx-6 mb-10 gap-4">
      <div className="flex items-center gap-6">
        <img src={Logo} alt="Flavoro Foods Logo" className="w-14 h-14" />
        <div>
          <h3 className="text-xl font-bold text-gray-600">
            {new Date().toUTCString().slice(0, 16)}
          </h3>
          <h1 className="text-3xl font-bold">Flavoro Foods</h1>
        </div>
      </div>
      <div>
        <input
          style={{ background: "rgba(211, 223, 228, 0.74)" }}
          type="search"
          name="search"
          placeholder="Search here"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 px-5 border border-gray-400 text-sm rounded-lg outline-none w-full lg:w-[25vw] placeholder-black"
        />
      </div>
    </nav>
  );
};

export default Navbar;
