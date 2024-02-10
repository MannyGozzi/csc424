const bcrypt = require('bcrypt')
export const saltRounds = 10

export async function saltPassword(password: string): Promise<string> {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        console.log("Error salting password: ", err);
        return "";
    }
}
export async function checkPassword(password: string, hash: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (err) {
        console.log("Error comparing password: ", err);
        return false;
    }
}