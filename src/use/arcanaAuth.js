import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AuthService from "../services/auth.service";

// const FIX_ME = null;

function useArcanaAuth() {
  const store = useStore();
  const router = useRouter();

  const auth = AuthService.getInstance();

  async function initAuth() {
    store.dispatch("showFullScreenLoader", "Initialising Arcana auth...");

    // AUTH-2: Initialise and configure the auth service.
    await auth.init({
      appMode: 2,
      position: "right",
    });
    // a) Initialise the auth service
    // b) Set a disconnect listener. On disconnect, clear store,
    //    route to login and perform a refresh
    auth.provider.on("disconnect", async () => {
      store.dispatch("clearStore");
      router.push("/login");
      router.go();
    });
    store.dispatch("hideFullScreenLoader");
  }

  async function isLoggedIn() {
    store.dispatch("showFullScreenLoader", "Checking login status...");

    // AUTH-3: Check if a user is logged in
    const loginStatus = await auth.isLoggedIn();

    store.dispatch("hideFullScreenLoader");
    return loginStatus;
  }

  async function requestSocialLogin(type) {
    // AUTH-4: Login user with selected social login type
    await auth.loginWithSocial(type);
  }

  async function fetchUserDetails() {
    store.dispatch("showFullScreenLoader", "Fetching account details...");

    // AUTH-5: Fetch user details
    const userInfo = await auth.getUser();

    store.dispatch("addUserInfo", JSON.parse(userInfo));

    // AUTH-6: Fetch user's wallet address
    const walletAddress = await auth.provider.request({
      method: "eth_accounts",
    });

    store.dispatch("addWalletInfo", { address: walletAddress });

    store.dispatch("hideFullScreenLoader");
  }

  async function logout() {
    // AUTH-7: Logout a user
    await auth.logout();
  }

  async function requestPublicKey(email) {
    // AUTH-8: Get public key associated with the email
    return await auth.getPublicKey(email);
  }

  return {
    fetchUserDetails,
    initAuth,
    isLoggedIn,
    logout,
    requestPublicKey,
    requestSocialLogin,
  };
}

export default useArcanaAuth;
