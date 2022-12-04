import { useState } from 'react';

function ContactPage() {
  const [ fullname, setFullname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ message, setMessage ] = useState('');

  return (
    <div className="pt-0 sm:pt-16">
      <form name="contact" method="POST" data-netlify="true" className="rounded-lg shadow-lg flex flex-col w-12/12 px-8 py-8 bg-gray-900 sm:w-9/12 sm:m-auto">
        <h1 className="text-2xl font-bold text-gray-50">Send a message</h1>

        <label for="fullname" className="text-gray-50 font-light mt-8">Full Name<span className="text-red-500">*</span></label>
        <input
          type="text"
          name="fullname"
          className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-white"
          onChange={ (e) => setFullname(e.target.value) }
        />

        <label for="email" className="text-gray-50 font-light mt-4">Email Address<span className="text-red-500">*</span></label>
        <input
          type="email"
          name="email"
          className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-white"
          onChange={ (e) => setEmail(e.target.value) }
        />

        <label for="subject" class="text-gray-50 font-light mt-4">Subject<span className="text-red-500">*</span></label>
        <input
          type="text"
          name="subject"
          className="bg-transparent border-b py-2 pl-4 focus:outline-node focus:rounded-md focus:ring-1 ring-green-500 font-light text-white"
          onChange={ (e) => setSubject(e.target.value) }
        />

        <label for="message" className="text-gray-50 font-light mt-4">Message<span className="text-red-500">*</span></label>
        <textarea
          name="message"
          className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-white"
          onChange={ (e) => setMessage(e.target.value) }
        >
        </textarea> 

        <div className="flex flex-row items-center justify-end">
          <button type="submit" className="px-10 mt-8 py-2 bg-[#130F49] text-white font-light rounded-md text-lg flex flex-row items-center">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
