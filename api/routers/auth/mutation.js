import { PrismaClient } from "@prisma/client";
import AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { hashPassword } from "../../utils";

const prisma = new PrismaClient();
const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const signUp = async (req, res) => {
  const { phone, password, fullName } = req.body;
  let country = "";
  if (phone.startsWith("+1")) {
    country = "USA";
  } else {
    country = "NIGERIA";
  }

  let hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        fullName,
        country,
      },
    });

    // send email verification

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signIn = async (req, res) => {};

const logout = async (req, res) => {};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

const verify = async (req, res) => {};

const sendSMS = async (phone, code) => {};

export { signUp, signIn, logout, forgotPassword, resetPassword, verify };
