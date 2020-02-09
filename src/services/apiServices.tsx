import { urlServer } from "../constants/constants";

// service signUp : add a new member

export const signUpService = async (
  newEmail,
  newUsername,
  newPassword,
  newRepassword
) => {
  const urlService = urlServer + "api/addNewMember";
  const newMember = {
    userName: newUsername.toLowerCase(),
    email: newEmail.toLowerCase(),
    password: newPassword.toLowerCase(),
    repassword: newRepassword.toLowerCase()
  };

  try {
    console.log(
      "On demande l'ajout du nouveau membre suivant : " +
        newMember.email +
        ", " +
        newMember.userName
    );
    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMember)
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// service de connexion

export const loginService = async (pEmail: string, pPassword: string) => {
  const urlService = urlServer + "api/login";
  const credentials = {
    username: pEmail.toLowerCase(),
    password: pPassword.toLowerCase()
  };

  try {
    console.log(
      "On demande la connexion pour l'email /" + credentials.username
    );
    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
