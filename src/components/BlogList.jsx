import React, { useEffect, useState } from "react";
import "../styles/BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.posts);
        setFilteredBlogs(data.posts);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredBlogs(blogs.filter((blog) => blog.title.toLowerCase().includes(term)));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="blog-container">
      <h1>Blog Posts</h1>
      <input
        type="text"
        placeholder="Search blog..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-box"
      />

      <div className="blog-list">
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.body.substring(0, 100)}...</p>
            <button>Read More</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
