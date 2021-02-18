# stringmask

Simple library for masking strings

# Installation

```
npm install --save @alxhghs/stringmask
```

# Usage

```typescript
import { maskString } from "@alxhghs/stringmask";

let str = maskString("hello");
// *****
str = maskString("hello", { maskWith: "-" });
// -----
str = maskString("hello again", { unmaskedStartCharacters: 3 });
// hel********
str = maskString("123-00-0000", { unmaskedEndCharacters: 4 });
// *******0000
str = maskString("123-00-0000", { ignoreChars: ["-"] });
// ***-**-****
```

# Types

```typescript
declare type Options = {
    maskWith?: string;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
    ignoreChars?: string[];
};
export declare function maskString(text: string, options?: Options): string;
```

# Options

| Option                    | Type       | Description                                                        | Default |
| ------------------------- | ---------- | ------------------------------------------------------------------ | ------- |
| `maskWith`                | `string`   | Optional: character to use for masking                             | `*`     |
| `unmaskedStartCharacters` | `number`   | Optional: number of unmasked characters at the start of the string | `0`     |
| `unmaskedEndCharacters`   | `number`   | Optional: number of unmasked characters at the end of the string   | `0`     |
| `ignoreChars`             | `string[]` | Optional: characters to leave unmasked                             | `[]`    |
