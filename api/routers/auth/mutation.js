import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import AmazonCognitoIdentity from "amazon-cognito-identity-js";
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

dotenv.config();

const attributes = (key, value) => ({
  Name: key,
  Value: value,
});
const prisma = new PrismaClient();
const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const signUp = async (req, res) => {
  const { phone, password, fullName } = req.body;

  const userPool = new CognitoUserPool(poolData);

  const attributeList = [
    attributes("phone_number", phone),
    attributes("given_name", fullName),
  ];

  const cognitoAttributeList = attributeList.map(
    (attribute) => new CognitoUserAttribute(attribute)
  );

  // check if user already exists

  userPool.signUp(phone, password, cognitoAttributeList, null, (err, data) => {
    if (err) {
      console.log("error 1: ", err);
      res.status(400).json({ error: err.message });
      return;
    }
    const resData = {
      user_id: data.userSub,
      phone_number: data.user.getUsername(),
      user_confirmed: data.userConfirmed,
    };

    console.log("data: ", data);
    console.log("data2: ", resData);

    res.json(resData);
  });
};

// const signUp = async (req, res) => {
//   const { phone, password, fullName } = req.body;
//   let country = "";
//   if (phone.startsWith("+234")) {
//     country = "NIGERIA";
//   } else {
//     country = "USA";
//   }

//   let hashedPassword = await hashPassword(password);

//   try {
//     // generate pin code
//     const codePin = Math.floor(100000 + Math.random() * 900000);

//     const user = await prisma.user.create({
//       data: {
//         phone,
//         password: hashedPassword,
//         fullName,
//         country,
//         codePin,
//       },
//     });

//     // send email verification
//     sendSMS(
//       phone,
//       `Your verification code is: ${codePin} \n\n Expires in 10 minutes`
//     );

//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const signIn = async (req, res) => {
  const { phone, password } = req.body;

  const userData = {
    Username: phone,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username: phone,
      Password: password,
    }
  );

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log("result: ", result);
      return res.json(result);
    },
    onFailure: (err) => {
      console.log("error: ", err);
      return res.status(400).json({ error: err.message });
    },
  });
};

const logout = async (req, res) => {};

const forgotPassword = async (req, res) => {
  const { phone } = req.body;

  const userData = {
    Username: phone,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.forgotPassword({
    onSuccess: (result) => {
      console.log("result: ", result);
      return res.json(result);
    },
    onFailure: (err) => {
      console.log("error: ", err);
      return res.status(400).json({ error: err.message });
    },
    inputVerificationCode: (data) => {
      console.log("data: ", data);
      return res.json(data);
    },
  });
};

const resetPassword = async (req, res) => {
  const { phone, code, newPassword } = req.body;

  const userData = {
    Username: phone,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmPassword(code, newPassword, {
    onSuccess: (result) => {
      console.log("result: ", result);
      return res.json(result);
    },
    onFailure: (err) => {
      console.log("error: ", err);
      return res.status(400).json({ error: err.message });
    },
  });
};

const verify = async (req, res) => {
  const { phone, code } = req.body;

  const userData = {
    Username: phone,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    console.log("result: ", result);
    return res.json(result);
  });
};

export { signUp, signIn, logout, forgotPassword, resetPassword, verify };
