import React, { useState } from "react";
import { Member, SignUp } from "../../../../services/memberService";
import { SignupForm } from "../../../../screens/welcome/components/SignupForm";

type Props = {
  memberToUpdate: Member;
};

export const ProfilForm = ({ memberToUpdate }: Props) => {
  const { id, email, userName } = memberToUpdate;

  const memberSignupTopUpdate: SignUp = {
    idToUpdate: id,
    email: email,
    userName: userName,
    password: "",
    repassword: "",
  };

  return <SignupForm memberToUpdate={memberSignupTopUpdate} />;
};
