export interface Block {
  scope: string,
  children: Block[],
}

/** Parse blocks of text based on indentation. */
export function parse(text: string): Block[]
