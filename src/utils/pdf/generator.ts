import { jsPDF } from 'jspdf';
import type { PDFContent, PDFOptions } from './types';
import { defaultPDFOptions } from './config';

export class PDFGenerator {
  private pdf: jsPDF;
  private options: PDFOptions;
  private currentY: number;
  private pageWidth: number;

  constructor(options: Partial<PDFOptions> = {}) {
    this.pdf = new jsPDF();
    this.options = { ...defaultPDFOptions, ...options };
    this.currentY = this.options.margin;
    this.pageWidth = this.pdf.internal.pageSize.width - 2 * this.options.margin;
  }

  private checkPageBreak(contentHeight: number): void {
    if (this.currentY + contentHeight > this.pdf.internal.pageSize.height - this.options.margin) {
      this.pdf.addPage();
      this.currentY = this.options.margin;
    }
  }

  private addText(text: string, fontSize: number): void {
    this.pdf.setFontSize(fontSize);
    const lines = this.pdf.splitTextToSize(text, this.pageWidth);
    const textHeight = lines.length * (fontSize / 3);
    
    this.checkPageBreak(textHeight);
    this.pdf.text(lines, this.options.margin, this.currentY);
    this.currentY += textHeight + 5;
  }

  public generate(content: PDFContent): void {
    // Add title
    this.addText(content.title, this.options.fontSize.title);
    this.currentY += 10;

    // Add sections
    content.sections.forEach(section => {
      this.addText(section.content, this.options.fontSize.content);
      
      if (section.choices) {
        section.choices.forEach(choice => {
          this.addText(choice, this.options.fontSize.content);
        });
        this.currentY += 5;
      }
    });
  }

  public save(filename: string): void {
    this.pdf.save(filename);
  }
}