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
    nickName: newUsername,
    email: newEmail,
    password: newPassword,
    repassword: newRepassword
  };

  try {
    console.log(
      "On va essayer d'ajouter le nouveau membre suivant : " +
        newMember.email +
        ", " +
        newMember.nickName
    );
    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMember)
    });
    console.log("La réponse est là : " + response);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const testService = () => {
  console.log("la fonction fonctionne bien hihihihihi");
};
