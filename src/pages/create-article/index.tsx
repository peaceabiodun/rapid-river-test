import { useState } from 'react';
import { ArticleFormDataType } from '../../utils/types';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { generateRandomNumber } from '../../utils/function';

const CreateArticle = () => {
  const navigate = useNavigate();
  const [loading, setLaoding] = useState(false);

  const [formData, setFormData] = useState<ArticleFormDataType>({
    name: '',
    email: '',
    body: '',
  });
  const disableBtn = !formData.name || !formData.email || !formData.body;
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      ...formData,
      postId: 1,
      id: generateRandomNumber(),
    };

    try {
      setLaoding(true);
      await axios.post(`${baseUrl}comments`, data);
      navigate('/');
    } catch (err: any) {
      console.log(err);
    } finally {
      setLaoding(false);
    }
  };

  return (
    <div className=" bg-[#dbdbdbb0] min-h-screen p-4 ">
      <Link to={'/'} className="border p-2">
        Go Back
      </Link>
      <div className=" flex flex-col items-center justify-center ">
        <h2 className="font-semibold text-xl">Create An Article</h2>
        <form onSubmit={submitForm} className="my-6 w-full sm:w-[350px] space-y-4 text-sm">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Enter Article Body</label>
            <textarea
              placeholder="type here ..."
              value={formData.body}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  body: e.target.value,
                })
              }
              className="border rounded-sm h-[250px] p-2 outline-none shadow-md "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Authors Name</label>
            <input
              type="text"
              placeholder="Scott Turow"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="p-2 outline-none border rounded-sm shadow-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Authors Email</label>
            <input
              type="email"
              placeholder="Scott@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="p-2 outline-none border rounded-sm shadow-md"
            />
          </div>
          {disableBtn && <div className="text-xs text-red-500 my-3">Please fill in all details</div>}

          <button
            type="submit"
            disabled={disableBtn}
            className="border bg-red-400  rounded-sm cursor-pointer text-white p-2 text-sm w-full"
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
