export interface PDFOptions {
  margin: number;
  fontSize: {
    title: number;
    content: number;
  };
}

export interface PDFContent {
  title: string;
  sections: {
    content: string;
    choices?: string[];
  }[];
}