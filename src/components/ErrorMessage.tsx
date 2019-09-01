import React from 'react';
import './styles/ErrorMessage.css';

type ErrorPageProps = {
  errorObj : any
}
const ErrorMessage = ({errorObj}: ErrorPageProps) => {
  if (!errorObj || !errorObj.message) return null;
  return (
    <div className="error">
      <p data-test="fetch-error">
        <strong>Error!</strong>
        {errorObj.message}
      </p>
    </div>
  )
}

export default ErrorMessage;