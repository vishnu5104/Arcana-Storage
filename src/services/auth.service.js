// AUTH-IMPORT: Import Arcana auth
// ...
import { AuthProvider } from "@arcana/auth";
// const FIX_ME = null;

function createAuthService() {
  // AUTH-1: Create a new instance of Arcana AuthProvider.
  const auth = new AuthProvider([2338]);

  function getInstance() {
    return auth;
  }

  return { getInstance };
}

const AuthService = Object.freeze(createAuthService());

export default AuthService;
