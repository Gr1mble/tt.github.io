export interface AuthModelSignup{
    username: string,
    email: string,
    phonenumber: string,
    password: string,
    games: boolean,
    emailCheck: boolean,
    sms: boolean
}

export interface AuthModelSignin{
    username: string,
    password: string
}