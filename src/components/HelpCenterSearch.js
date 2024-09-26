import React, { useState } from 'react';
import axios from 'axios';

function HelpCenterSearch() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);

  const handleSearch = (isZendesk) => {
    if (isZendesk) {
      axios
      .get('https://d3v-collective.zendesk.com/api/v2/help_center/articles/search.json', {
        params: { query },
      })
      .then((response) => {
        setArticles(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
    } else {
      axios
      .get('http://localhost:5000/helpcenter/search', {
        params: { query },
      })
      .then((response) => {
        setArticles(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
    }


  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Help Center Search</h1>
      <form className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="p-2 border rounded w-full"
        />
        <button
          onClick={() => handleSearch(false)}
          type="button"
          className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
        >
          Search using Backend
        </button>
        <button
          onClick={() => handleSearch(true)}
          type="button"
          className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
        >
          Search using Zendesk API
        </button>
      </form>
      <div>
        {articles.map((article) => (
          <div key={article.id} className="mb-4">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: article.snippet }} />
            <a
              href={`/article/${article.id}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpCenterSearch;
