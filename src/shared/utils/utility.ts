import crypto from "crypto";
import argon2 from "argon2";

export const removeBackslash = (json: string): string => json.replace(/\\"/g, '"');

export const get = (data: {[p: string]: any} | undefined, key: string) => {
    if (!key.includes('.')) return data?.[key];

    let result = data;
    key.split('.').forEach((item) => {
        if(result === undefined) {
            return;
        }
        result = result[item];
    });

    return result;
};

export const generateHash = async (password: string): Promise<string> => {
    const salt = crypto.randomBytes(16);
    return argon2.hash(password, { salt });
}