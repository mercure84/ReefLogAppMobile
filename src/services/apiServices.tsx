import { urlServer } from "../constants/constants";

// service signUp : add a new member

export const signUpService = async () => {
  const urlService = urlServer + "api/addNewMember";
  const newMember = {
    lastName: "NomTestInteg",
    firstName: "PrenomTestInteg",
    nickName: "PseudoInteg",
    email: "test123@chaville.fr",
    password: "test123",
    repassword: "test123"
  };

  try {
    const response = await fetch("http://192.168.1.19:8080/api/addNewMember", {
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
