export const cookieOptions: cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 3600000 * 24 * 30
}

declare type cookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: sameSiteValues,
  maxAge: number
}

type sameSiteValues = 'strict' | 'lax' | 'none'
