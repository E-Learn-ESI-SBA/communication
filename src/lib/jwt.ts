import { jwtVerify } from "jose";
import { UserClaims } from "src/user-claims/user-claims";
import { validate } from "class-validator";

async function ParseJwt(signedToken: string, secretKey: string) {
  try {
    const encodedSecretKey = new TextEncoder().encode(secretKey);
    const decoded = await jwtVerify<UserClaims>(signedToken, encodedSecretKey);
    const userClaim: UserClaims = {
      email: decoded.payload.email,
      username: decoded.payload.username,
      role: decoded.payload.role,
      id: decoded.payload.id,
      avatar: decoded.payload.avatar,
      group: decoded.payload.group,
      year: decoded.payload.year,
      exp: decoded.payload.exp,
    };
    try {
      await validate(userClaim);
    } catch (e) {
      throw new Error("Invalid Payload");
    }
    return decoded;
  } catch (err) {
    if (err) {
      throw err;
    } else {
      console.error(`Invalid Payload: ${err}`);
      throw err;
    }
  }
}

// Function to validate the JWT and extract user details
export async function ValidateToken(signedToken: string, secretKey: string) {
  const decoded = await ParseJwt(signedToken, secretKey);

  const expTime = decoded.payload.exp;
  if (expTime < Date.now() / 1000) {
    return new Error("EXPIRED TOKEN");
  }


  return decoded.payload;
}