import { VALUE_PROTECTED_VERIFY } from "#config/index.mjs";

class Utils {

  validateRequestBody(body, props) {
    if (!body) {
      return true;
    }

    let estatus = [];
    for (const p of props) {
      estatus = [ ...estatus, p in body ]
    }
    return !!estatus.includes(false)
  }

  validateKeyValidator(keyValidator) {
    return keyValidator === VALUE_PROTECTED_VERIFY
  }
}

export {
  Utils
}