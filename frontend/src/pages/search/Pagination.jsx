import React, { useState } from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const [limitBtn, setLimitBtn] = useState(7);
  const [first, setFirst] = useState(0);

  let pages = [];

  let a = 100;

  for (let i = 1; i <= a; i++) {
    pages.push(i);
  }

  const handleFoward = () => {
    if (pages.length > 0) {
      setLimitBtn(limitBtn + 7);
    }
    const firstindex = limitBtn - first === 7;

    if (firstindex) {
      setFirst(first + 7);
    }
  };

  const handleBack = () => {
    if (limitBtn >= 14) {
      setLimitBtn(limitBtn - 7);
    }

    const firstindex = limitBtn - first === 7;
    if (firstindex) {
      setFirst(first - 7);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handleBack}>back</button>
      {pages.slice(first, limitBtn).map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className="pagination-link"
          >
            {page}
          </button>
        );
      })}
      <button onClick={handleFoward}>more</button>
    </div>
  );
};

export default Pagination;
