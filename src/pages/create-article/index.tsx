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
  const [formError, setFormError] = useState<Partial<ArticleFormDataType>>({});

  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const formIsValid = (): boolean => {
    setFormError({});
    const name = formData.name.trim();
    const email = formData.email.trim();
    const body = formData.body.trim();
    let isValid = true;

    if (!name) {
      setFormError((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
      isValid = false;
    }
    if (!email) {
      setFormError((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      isValid = false;
    }
    if (!body) {
      setFormError((prevErrors) => ({ ...prevErrors, body: 'Body text is required' }));
      isValid = false;
    }

    return isValid;
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid()) return;
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

  const updateFormData = (key: string, value: string) => {
    setFormError((p) => ({ ...p, [key]: false }));
    setFormData((p) => ({ ...p, [key]: value }));
  };

  return (
    <div className=" bg-[#e6f9fcb0] min-h-screen p-4 ">
      <Link to={'/'} className="bg-white shadow-md p-2 text-sm ">
        Go Back
      </Link>
      <div className=" flex flex-col items-center justify-center mt-4 ">
        <h2 className="font-semibold text-xl text-blue-800">Create An Article</h2>
        <form onSubmit={submitForm} className="my-6 w-full sm:w-[350px] space-y-4 text-sm">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Enter Article Body</label>
            <textarea
              placeholder="type here ..."
              value={formData.body}
              onChange={(e) => updateFormData('body', e.target.value)}
              className="border rounded-sm h-[250px] p-2 outline-none shadow-md "
            />
            {formError.body && <div className="text-xs text-red-500 my-2">{formError.body}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Authors Name</label>
            <input
              type="text"
              placeholder="Scott Turow"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="p-2 outline-none border rounded-sm shadow-md"
            />
            {formError.name && <div className="text-xs text-red-500 my-2">{formError.name}</div>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Authors Email</label>
            <input
              type="email"
              placeholder="Scott@gmail.com"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="p-2 outline-none border rounded-sm shadow-md"
            />
            {formError.email && <div className="text-xs text-red-500 my-2">{formError.email}</div>}
          </div>

          <button
            type="submit"
            className="border bg-blue-400  rounded-sm cursor-pointer  text-white p-2 text-sm w-full"
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
