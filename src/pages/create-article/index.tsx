import { useState } from 'react';
import { ArticleFormDataType } from '../../utils/types';

const CreateArticle = () => {
  const [loading, setLaoding] = useState(false);
  const [formData, setFormData] = useState<ArticleFormDataType>({
    snippet: '',
    name: '',
    email: '',
    phone_number: '',
  });
  const disableBtn = !formData.snippet || !formData.name || !formData.email || !formData.phone_number;
  const submitForm = async () => {
    setLaoding(true);
    try {
    } catch (err: any) {
      console.log(err);
    } finally {
      setLaoding(false);
    }
  };
  return (
    <div className=" bg-[#dbdbdbb0] min-h-screen p-4 flex flex-col items-center justify-center ">
      <h2 className="font-semibold text-xl">Create An Article</h2>
      <form className="my-6 w-full sm:w-[350px] space-y-4 text-sm md:text-lg">
        <div className="flex flex-col gap-2">
          <label>Enter Article Snippet</label>
          <textarea
            placeholder="type here ..."
            className="border rounded-sm h-[250px] p-2 outline-none border-[#b9b9b9] bg-transparent "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Authors Name</label>
          <input
            type="text"
            placeholder="Scott Turow"
            className="p-2 outline-none border rounded-sm border-[#b9b9b9] bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Authors Email</label>
          <input
            type="email"
            placeholder="Scott@gmail.com"
            className="p-2 outline-none border rounded-sm border-[#b9b9b9] bg-transparent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Authors Phone Number</label>
          <input
            type="tel"
            placeholder=" +202 588-6500"
            className="p-2 outline-none border rounded-sm border-[#b9b9b9] bg-transparent"
          />
        </div>
        <button disabled={disableBtn} className="border border-[#b9b9b9] p-2 text-sm w-full">
          {loading ? 'loading' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
