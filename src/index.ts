type Options = {
    maskWith?: string;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
    ignoreChars?: string[];
};

export function maskString(text: string, options?: Options): string {
    if (!text) return "";

    const {
        unmaskedStartCharacters = 0,
        unmaskedEndCharacters = 0,
        ignoreChars = [],
        maskWith = "*",
    } = options ?? {};

    const textToMask = text.trim();

    const midIndices =
        textToMask.length - unmaskedEndCharacters > 0
            ? [
                  unmaskedStartCharacters,
                  textToMask.length - unmaskedEndCharacters,
              ]
            : null;

    const showAll =
        textToMask.length - unmaskedEndCharacters - unmaskedStartCharacters <=
        0;

    if (!midIndices || showAll) {
        return text;
    }

    const sortedIgnoreChars = ignoreChars.some((c) => c === "-")
        ? ["-", ...ignoreChars.filter((c) => c !== "-")]
        : ignoreChars;

    const regex = sortedIgnoreChars.length
        ? new RegExp(`[^${sortedIgnoreChars.join("")}.]`, "gm")
        : /./gm;

    const start = textToMask.slice(0, unmaskedStartCharacters);

    const mid = textToMask
        .slice(midIndices[0], midIndices[1])
        .replace(regex, maskWith);

    const end = textToMask.slice(textToMask.length - unmaskedEndCharacters);

    return start + mid + end;
}
