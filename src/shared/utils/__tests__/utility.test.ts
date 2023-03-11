import { removeBackslash, get } from '../utility';

describe('removeBackslash', () => {
    it('removes backslashes before double quotes', () => {
        const input = '{"name":\\"Alice\\"}';
        expect(removeBackslash(input)).toEqual(JSON.stringify({
            name: "Alice"
        }));
    });

    it('does not remove backslashes from escaped forward slashes', () => {
        const input = '{"path": "\\/home\\/user\\/file.txt"}';
        expect(removeBackslash(input)).toEqual(input);
    });
});

describe('get', () => {
    it('returns undefined if the key is not found', () => {
        const data = { name: 'Alice' };
        const key = 'age';
        expect(get(data, key)).toBeUndefined();
    });

    it('returns the value for a simple key', () => {
        const data = { name: 'Alice' };
        const key = 'name';
        expect(get(data, key)).toEqual('Alice');
    });

    it('returns the value for a nested key', () => {
        const data = { person: { name: 'Alice', age: 30 } };
        const key = 'person.age';
        expect(get(data, key)).toEqual(30);
    });

    it('returns undefined for a nested key that does not exist', () => {
        const data = { person: { name: 'Alice' } };
        const key = 'person.age';
        expect(get(data, key)).toBeUndefined();
    });

    it('returns undefined for undefined data', () => {
        const data = undefined;
        const key = 'name';
        expect(get(data, key)).toBeUndefined();
    });
});
