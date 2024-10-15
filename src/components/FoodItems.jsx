// FoodItems.js
import React, { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";

const FoodItems = () => {
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  const [foodData, setFoodData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination states
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  const fetchAllFoods = async () => {
    try {
      const res = await fetch("https://dummyjson.com/recipes?limit=0");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setFoodData(data.recipes || []);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  // Fetch all foods initially and when search is cleared
  useEffect(() => {
    fetchAllFoods();
  }, [dispatch]);

  // Refetch food data if search term is cleared
  useEffect(() => {
    if (search === "") {
      fetchAllFoods();
    }
  }, [search]);

  // Filter food items based on category and search term
  const filteredItems = foodData.filter((food) => {
    const foodName = food.name.toLowerCase();
    const isCategoryMatch =
      category === "All" || category.toLowerCase() === food.mealType[0].toLowerCase();
    const isSearchMatch = foodName.includes(search.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="flex flex-wrap gap-10 justify-center lg:justify-start mx-6 my-10"
        style={{ background: "linear-gradient(to bottom right, #f0f4f8, #e1e8ed, #d3dfe4)", padding: "40px 20px" }}
      >
        {currentItems.map((food) => (
          <FoodCard
            key={food.id}
            id={food.id}
            name={food.name}
            price={food.caloriesPerServing}
            desc={food.instructions.join("")}
            rating={food.rating}
            img={food.image}
            handleToast={(name) => toast.success(`Added ${name}`)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-5">
        <button
          onClick={handlePrevPage}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={currentPage === 1 || filteredItems.length === 0}
        >
          Previous
        </button>
        <span className="my-auto">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={currentPage === totalPages || filteredItems.length === 0}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FoodItems;
