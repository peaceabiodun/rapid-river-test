import { ArticleType } from '../../utils/types';

type CardProps = {
  articles: ArticleType;
};

const ArticleCards = ({ articles }: CardProps) => {
  return (
    <div className="bg-white hover:bg-[#faefefcb] p-5 text-sm shadow-md rounded-md">
      <h3 className="font-semibold mb-3">Name: {articles.name}</h3>
      <p className="font-medium mb-3">Email: {articles.email}</p>
      <p className="text-gray-500">Body: {articles.body}</p>
    </div>
  );
};

export default ArticleCards;
