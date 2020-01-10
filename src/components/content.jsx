import React, { useState, useEffect } from "react";

import Filters from "./filters";
import { getContent } from "../services/contentService";
import ContentItem from "./contentItem";
import Pagination from "./common/pagination";

const Content = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesAmount, setPagesAmount] = useState(0);

  const [searchBy, setSearchBy] = useState("Date");
  const [searchType, setSearchType] = useState("Stories");
  const [searchForTime, setSearchForTime] = useState("All time");

  // const [query, setQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(30);

  // console.log("By", searchBy, "Type", searchType, "forTime", searchForTime);

  useEffect(() => {
    let shouldIgnore = false;
    async function fetchData() {
      try {
        const contentData = await getContent(
          searchBy,
          searchType,
          searchForTime,
          currentPage,
          itemsPerPage
        );
        if (!shouldIgnore) {
          setItems([...contentData.hits]);
          setPagesAmount(contentData.nbPages);
        }
      } catch (ex) {
        console.log("Fetching items error: ", ex);
      }
    }
    fetchData();
    return () => (shouldIgnore = true);
  }, [currentPage, searchBy, searchType, itemsPerPage, searchForTime]);

  return (
    <React.Fragment>
      <Filters
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        searchType={searchType}
        setSearchType={setSearchType}
        searchForTime={searchForTime}
        setSearchForTime={setSearchForTime}
      />
      <ContentItem items={items} />
      <Pagination
        currentPage={currentPage}
        pagesAmount={pagesAmount}
        setCurrentPage={setCurrentPage}
      />
    </React.Fragment>
  );
};

export default Content;