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
