module.exports = {
  login: async ({ accountType, username, password }) => {
    return utils.post("/users/login", { accountType, username, password });
  },
  signup: async ({
    accountType,
    firstName,
    lastName,
    mobile,
    email,
    username,
    password,
  }) => {
    return utils.post("/users/register", {
      accountType,
      firstName,
      lastName,
      mobile,
      email,
      username,
      password,
    });
  },
  forgetPassword: async ({ email }) => {
    return utils.patch("/users/requestResetPassword", { email });
  },
  verifyAccount: async ({ verificationCode, email }) => {
    return utils.patch("/users/verify", { verificationCode, email });
  },
  resendAccountVerificationCode: async ({ email }) => {
    return utils.patch("/users/resendAccountVerificationCode", { email });
  },
  verifyPasswordReset: async ({ verificationCode, email }) => {
    return utils.patch("/users/checkResetPasswordCode", {
      verificationCode,
      email,
    });
  },
  resendResetPasswordCode: async ({ email }) => {
    return utils.patch("/users/resendResetPasswordCode", { email });
  },
  resetPassword: async ({ password, verificationCode, email }) => {
    return utils.patch("/users/resetPassword", {
      password,
      verificationCode,
      email,
    });
  },
};
