import bcrypt from "bcrypt";


//------ password hashing using bcrypt
export const hashedPassword = async (password)=>{

    const passwordHashed = await bcrypt.hash(password, 12);

    return passwordHashed;
}


//------ compared password using bcrypt

export const comparedPassword = async(password, hashedPassword)=>{

    const compardResult = bcrypt.compare(password, hashedPassword);

    return compardResult;
}


