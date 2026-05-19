import React from 'react';
import {useRef} from 'react';
import './form.css';
const ContactForm = () => {
    const messageRef = useRef();

    const onSubmit = (event)=>{
      event.preventDefault();
      const messageValue = messageRef.current.value.toLowerCase();
      if(messageValue.includes('shit') || messageValue.includes('fuck') ||messageValue.includes('khra')){
        messageRef.current.style.borderColor = 'red';
      }
    }
  return (
    <div className="wrapper">
      <form action="" onSubmit={onSubmit}>
        <div className="title">Contact Us</div>
        <div className="name-wrapper">
          <input
            type="text"
            name="first-name"
            placeholder="First Name"
            autoFocus={true}
            required
          />
          <input
            type="text"
            name="last-name"
            placeholder="Last Name"
            required
          />
        </div>
        <input type="email" name="email" placeholder="Email" required />
        <textarea
          name="comment"
          form="cform"
          placeholder="Message"
          ref={messageRef}
          required
        ></textarea>
        <button id="submit" name="submit" type="submit"></button>
      </form>
    </div>
  );
};

export default ContactForm;
