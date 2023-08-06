const NON_BREAKING_HYPHEN = "\u2011";

export const replaceHypen = (text: string) => text.replace("-", NON_BREAKING_HYPHEN);
