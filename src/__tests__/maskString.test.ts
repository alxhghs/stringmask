import { maskString } from "../index";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const DEFAULT_MASK = "*";
const SSN = "123-00-0000";

test("Mask entire string", () => {
    const maskedValue = [...new Array(ALPHABET.length)]
        .map(() => DEFAULT_MASK)
        .join("");
    expect(maskString(ALPHABET)).toBe(maskedValue);
});

test("Mask everything but first 4 characters", () => {
    const unmaskedStartCharacters = 4;
    const firstFour = ALPHABET.slice(0, unmaskedStartCharacters);
    const maskedValue = [
        ...new Array(ALPHABET.length - unmaskedStartCharacters),
    ]
        .map(() => DEFAULT_MASK)
        .join("");
    expect(maskString(ALPHABET, { unmaskedStartCharacters })).toBe(
        firstFour + maskedValue,
    );
});

test("Mask everything but last 3 characters", () => {
    const unmaskedEndCharacters = 3;
    const maskedValue = [...new Array(ALPHABET.length - unmaskedEndCharacters)]
        .map(() => DEFAULT_MASK)
        .join("");
    const lastThree = ALPHABET.slice(ALPHABET.length - unmaskedEndCharacters);
    expect(maskString(ALPHABET, { unmaskedEndCharacters })).toBe(
        maskedValue + lastThree,
    );
});

test("Mask with special character", () => {
    const maskWith = "-";
    const maskedValue = [...new Array(ALPHABET.length)]
        .map(() => maskWith)
        .join("");
    expect(maskString(ALPHABET, { maskWith })).toBe(maskedValue);
});

test("Mask but ignore certain characters", () => {
    const ignoreChars = ["a", "b", "-"];
    const string = "123-456-abcd-efgh";
    const maskedValue = "***-***-ab**-****";
    expect(maskString(string, { ignoreChars })).toBe(maskedValue);
});

test("Mask short string with large unmasked character values", () => {
    const unmaskedStartCharacters = 100;
    const unmaskedEndCharacters = 100;
    expect(
        maskString(ALPHABET, {
            unmaskedStartCharacters,
            unmaskedEndCharacters,
        }),
    ).toBe(ALPHABET);
});

test("Unmask first 2, last 3 and maskWith 'x'", () => {
    const unmaskedStartCharacters = 2;
    const unmaskedEndCharacters = 3;
    const ignoreChars = ["-"];
    const maskWith = "x";
    const maskedValue =
        "ab" +
        [...new Array(ALPHABET.length - 5)].map(() => maskWith).join("") +
        "xyz";
    expect(
        maskString(ALPHABET, {
            unmaskedStartCharacters,
            unmaskedEndCharacters,
            ignoreChars,
            maskWith,
        }),
    ).toBe(maskedValue);
});

test("Mask SSN except last 4 and ignore '-'", () => {
    const unmaskedEndCharacters = 4;
    const ignoreChars = ["-"];
    const maskedValue =
        "***-**-" + SSN.slice(SSN.length - unmaskedEndCharacters);
    expect(maskString(SSN, { unmaskedEndCharacters, ignoreChars })).toBe(
        maskedValue,
    );
});

test("Mask SSN except last 3, ignore '-' and mask with 'x'", () => {
    const unmaskedEndCharacters = 3;
    const ignoreChars = ["-"];
    const maskWith = "x";
    const maskedValue =
        "xxx-xx-x" + SSN.slice(SSN.length - unmaskedEndCharacters);
    expect(
        maskString(SSN, { unmaskedEndCharacters, ignoreChars, maskWith }),
    ).toBe(maskedValue);
});

test("Mask nothing because of text length", () => {
    const unmaskedEndCharacters = 4;
    const unmaskedStartCharacters = 4;
    const text = "abcd1234";
    expect(
        maskString(text, { unmaskedStartCharacters, unmaskedEndCharacters }),
    ).toBe(text);
});

test("Unmask first 4 and last 4", () => {
    const unmaskedEndCharacters = 4;
    const unmaskedStartCharacters = 4;
    const text = "abcde1234";
    const maskedValue = "abcd*1234";
    expect(
        maskString(text, { unmaskedStartCharacters, unmaskedEndCharacters }),
    ).toBe(maskedValue);
});

test("Mask but ignore many characters", () => {
    const ignoreChars = ["a-z", "0-9", "-"];
    const text = "abc--ABC123";
    const maskedValue = "abc--***123";
    expect(maskString(text, { ignoreChars })).toBe(maskedValue);
});
