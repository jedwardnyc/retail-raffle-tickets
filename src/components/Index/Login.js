import React from 'react';

export default function Login(){
    return (
      <div>
        <h1> Please Log in </h1>
        <form className='form-control'>
          <input placeholder='username'/>&nbsp;
          <input placeholder='password'/>&nbsp;
          <button> Log in </button>
        </form>
      </div>
    )
  };