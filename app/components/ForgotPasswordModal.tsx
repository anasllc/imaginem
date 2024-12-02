import React from "react";

function ForgotPasswordModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>Forgot Password</h2>
        <p>
          Reset your password by following the instructions sent to your email.
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
