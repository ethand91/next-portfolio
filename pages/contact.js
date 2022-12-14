import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import emailjs from '@emailjs/browser';

import contactTranslations from './../public/assets/translations/contact.json';

function ContactPage() {
  const form = useRef();
  const { locale } = useRouter();

  const contactItems = contactTranslations.contact.filter(item => item.locale === locale);

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm('service_qz6zxh3', 'template_s6ll9hl', form.current, '1PVVpqMraXzVXJuXv');
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <div className="pt-0 sm:pt-16">
      <form name="contact" ref={ form } onSubmit={ sendEmail } className="rounded-lg shadow-lg flex flex-col w-12/12 px-8 py-8 bg-gray-900 sm:w-9/12 sm:m-auto">
        <h1 className="text-2xl font-bold text-gray-50">
          { contactItems[0].title }
        </h1>

        <label htmlFor="fullname" className="text-gray-50 font-light mt-8">{ contactItems[0].fullName }<span className="text-red-500">*</span></label>
        <input
          type="text"
          name="from_name"
          className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-white"
        />

        <label htmlFor="email" className="text-gray-50 font-light mt-4">{ contactItems[0].email }<span className="text-red-500">*</span></label>
        <input
          type="email"
          name="from_email"
          className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-white"
        />

        <label htmlFor="subject" className="text-gray-50 font-light mt-4">{ contactItems[0].subject }<span className="text-red-500">*</span></label>
        <input
          type="text"
          name="message"
          className="bg-transparent border-b py-2 pl-4 focus:outline-node focus:rounded-md focus:ring-1 ring-green-500 font-light text-white"
        />

        <label htmlFor="message" className="text-gray-50 font-light mt-4">{ contactItems[0].message }<span className="text-red-500">*</span></label>
        <textarea
          name="message"
          className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-white"
        >
        </textarea> 

        <div className="flex flex-row items-center justify-end">
          <button type="submit" className="px-10 mt-8 py-2 bg-[#130F49] text-white font-light rounded-md text-lg flex flex-row items-center">
            { contactItems[0].send }
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
