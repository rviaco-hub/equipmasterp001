import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RobotCheck = ({verified,setVerified}) => {

  const onChange = (value) => {
    console.log("Captcha value:", value);
    if (value) setVerified(true);
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={onChange}
      />
      {verified ? <p>✔ Validado</p> : <p>⚠ Marca la casilla</p>}
    </div>
  );
};

export default RobotCheck;
