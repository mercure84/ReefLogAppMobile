import { urlServer } from "../constants/constants";
import { getData } from "./storageDevice";

// typage d'un membre

export type Member = {
  id: string;
  lastName?: any;
  firstName?: any;
  userName: string;
  email: string;
  password: string;
  signupDate: string;
  role: string;
};

export type SignUp = {
  idToUpdate?: string;
  email: string;
  userName: string;
  password: string;
  repassword: string;
};

// service signUp : add ou update a new member
export const signUpService = async (
  signUpForm: SignUp,
  isUpdating?: boolean
) => {
  const urlService = !isUpdating
    ? urlServer + "api/addNewMember"
    : urlServer + "api/updateMember";
  const newMember = {
    idToUpdate: signUpForm.idToUpdate ?? null,
    userName: signUpForm.userName.toLowerCase(),
    email: signUpForm.email.toLowerCase(),
    password: signUpForm.password.toLowerCase(),
    repassword: signUpForm.repassword.toLowerCase(),
  };
  try {
    const token = await getData("token");
    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newMember),
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
    password: pPassword.toLowerCase(),
  };

  try {
    console.log(
      "On demande la connexion pour l'email /" + credentials.username
    );
    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// service checkToken
export const checkToken = async (pEmail: string, pToken: string) => {
  const urlService = urlServer + "api/checkToken";
  const dataToValidate = {
    email: pEmail.toLowerCase(),
    token: pToken,
  };
  try {
    console.log(
      "On demande la validation du jeton trouvé avec l'email : " +
        dataToValidate.email
    );
    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToValidate),
    });
    const dataResponse = response.json();
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

// service détail d'un membre
export const getMemberDetail = async (
  pEmail: string,
  token: string
): Promise<Member> => {
  const email = pEmail.toLocaleLowerCase();
  const urlService = urlServer + "api/getMemberDetail/" + email;

  try {
    console.log("On demande les détails du membre : " + email);
    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const dataResponse = response.json();
    console.log("Requête getMemberDetail OK");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

export const getPasswordRecover = async (pEmail: string) => {
  const email = pEmail.toLocaleLowerCase();
  const urlService = urlServer + "api/recoverPassword/" + email;
  try {
    console.log("on demande le recover pour le membre : ", email);
    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const dataResponse = response.json();
    console.log("Requête recoverPassword finie");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
