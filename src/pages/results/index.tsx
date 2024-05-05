import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleType } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import ArticleCards from '../../components/article-card';

const Results = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLaoding] = useState(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const getArticles = async () => {
    setLaoding(true);
    try {
      const res = await axios.get(`${baseUrl}comments`);
      setArticles(res.data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const filteredArticles = searchValue
    ? articles.filter((article) => article.name.includes(searchValue) || article.body.includes(searchValue))
    : articles;
  return (
    <div className="bg-[#dbdbdbb0] min-h-screen p-4  ">
      <h2 className="font-semibold text-xl text-center">Search for Articles</h2>

      <div className="flex text-sm my-6 justify-center">
        <input
          type="search"
          placeholder="Search for an article"
          className="outline-none border p-2 w-full sm:w-[300px]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="border border-[#b9b9b9] p-2 ">Search</button>
      </div>

      <button onClick={() => navigate('/create-article')} className="border shadow-md p-2 text-sm">
        Add Article
      </button>

      {loading ? (
        <div className="mt-6 flex text-sm justify-center ">Loading ...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {filteredArticles.length === 0 ? (
            <div>No Articles Found</div>
          ) : (
            filteredArticles.map((item) => <ArticleCards key={item.id} articles={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
