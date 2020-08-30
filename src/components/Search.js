import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchTerm, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const doSearch = async () => {
      const baseUrl = 'https://en.wikipedia.org/w/api.php';
      const resp = await axios.get(baseUrl, {
        params: {
          action: 'query',
          list: 'search',
          format: 'json',
          origin: '*',
          srsearch: debouncedTerm
        }
      });
      setResults(resp.data.query.search);
    };

    if(debouncedTerm) {
      doSearch();
    } else {
      setResults([]);
    }
  }, [debouncedTerm]);

  const renderedResults = results.map(result => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="search-input">Enter Search Term</label>
          <input
            id="search-input"
            className="input"
            value={searchTerm}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  );
};

export default Search;