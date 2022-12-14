"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenTypes = void 0;
exports.tokenTypes = {
    "plus": /^\+/,
    "bitwise comparison": /^[\&\|]/,
    "bitwise shift": /^(<<|>>)/,
    "bitwise not": /\~/,
    "character": /^'([^']|\\')'/,
    "colon": /^:/,
    "comma": /^,/,
    "comment": /^#[^\n]*/,
    "comparison": /^(==|!=|<=?|>=?)/,
    "dot": /^\./,
    "integer": /^\d+/,
    "keyword": /^(else|fun|if|loop|return|until|var)\b/,
    "left brace": /^\{/,
    "left parentheses": /^\(/,
    "minus": /^\-/,
    "multiplicative": /^[\*\/\%]/,
    "newline": /^\n+/,
    "right brace": /^\}/,
    "right parentheses": /^\)/,
    "string": /^"([^"]|\\")*"/,
    "whitespace": /^[ \t]+/,
    "xor": /^\^/,
    "identifier": /^[a-zA-Z_]\w*/,
    "unrecognized": /^[^\n\t ]+/
};
let tokenTypeNames = Object.keys(exports.tokenTypes);
let tokenTypeAmount = tokenTypeNames.length;
;
function tokenize(code) {
    let tokens = [];
    let remainingCode = code;
    let currentIndex = 0;
    let lineNumber = 0;
    while (remainingCode) {
        let matchFound = false;
        for (let i = 0; i < tokenTypeAmount; i++) {
            let tokenTypeName = tokenTypeNames[i];
            let tokenTypeRegex = exports.tokenTypes[tokenTypeName];
            let match = tokenTypeRegex.exec(remainingCode);
            if (match) {
                let matchedBit = match[0];
                if (tokenTypeName !== "whitespace" && tokenTypeName !== "comment")
                    tokens.push({ type: tokenTypeName, value: matchedBit, line: lineNumber, column: currentIndex });
                remainingCode = remainingCode.substring(matchedBit.length);
                currentIndex += matchedBit.length;
                let newlineCount = (matchedBit.match(/\n/g) || []).length;
                if (newlineCount) {
                    currentIndex = 0;
                    lineNumber += newlineCount;
                }
                matchFound = true;
                break;
            }
        }
        if (!matchFound)
            throw `Error: No match found for ${remainingCode}`;
    }
    let tokenCopy = [];
    tokens.forEach(token => {
        if (token.type !== "newline" || (token.type === "newline" && tokenCopy[tokenCopy.length - 1]?.type !== "newline"))
            tokenCopy.push(token);
    });
    return tokenCopy;
}
exports.default = tokenize;
