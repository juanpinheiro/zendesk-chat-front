import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios
      .get(`https://d3v-collective.zendesk.com/api/v2/help_center/articles/${articleId}.json`)
      .then((response) => {
        setArticle(response.data.article);
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
      });
  }, [articleId]);

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </div>
  );
}

export default ArticleDetail;
