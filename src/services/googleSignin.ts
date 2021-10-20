import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import RootStore from "../store/RootStore";
import { getTokenWithGoogleOAuth2 } from "./memberService";
import { storeData } from "./storageDevice";

export const googleSignIn = async () => {
  const { memberStore } = RootStore;
  // It will prompt google Signin Widget
  try {
    await GoogleSignin.hasPlayServices({
      // Check if device has Google Play Services installed
      // Always resolves to true on iOS
      showPlayServicesUpdateDialog: true,
    });
    const userInfo = await GoogleSignin.signIn();
    console.log("User Info --> ", userInfo);
    memberStore.googleToken = userInfo.idToken ?? "";
    if (userInfo.idToken) {
      console.log("ON envoie le token au backEnd Rest Spring");
      const response = await getTokenWithGoogleOAuth2(
        userInfo.idToken,
        userInfo.user.email
      );
      console.log("My Response = ", response);
      if (response.jwtToken) {
        await storeData("token", "Bearer " + response.jwtToken);
        await storeData("emailUser", response.email);
        return "success";
      }
      return "error";
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("User Cancelled the Login Flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("Signing In");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("Play Services Not Available or Outdated");
    } else {
      console.log(error?.message);
    }
    return "error";
  }
};

export const getCurrentUserInfo = async () => {
  try {
    let info = await GoogleSignin.signInSilently();
    console.log("[Get Current Info // User Info --> ", info);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      console.log("User has not signed in yet");
    } else {
      console.log("Unable to get user's info");
    }
  }
};

export const isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  if (isSignedIn) {
    console.log("User is already signed in");
    // Set User Info if user is already signed in
    await getCurrentUserInfo();
  } else {
    console.log("Please Login");
  }
};
