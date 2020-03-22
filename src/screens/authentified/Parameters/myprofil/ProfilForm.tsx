import React, { useState } from "react";
import { Member, SignUp } from "../../../../services/memberService";
import { SignupForm } from "../../../../screens/welcome/components/SignupForm";
import { MessageInfo } from "../../../../components/MessageInfo";

type Props = {
  memberToUpdate: Member;
};

export const ProfilForm = ({ memberToUpdate }: Props) => {
  const [infoMessage, setInfoMessage] = useState(
    "Vous pouvez modifier votre profil ici"
  );
  const memberSignupTopUpdate: SignUp = {
    idToUpdate: memberToUpdate.id,
    email: memberToUpdate.email,
    userName: memberToUpdate.userName,
    password: null,
    repassword: null
  };

  return (
    <>
      <MessageInfo message={infoMessage} />

      <SignupForm
        memberToUpdate={memberSignupTopUpdate}
        homeInfoCallBack={setInfoMessage}
      />
    </>
  );
};
