import { formatStoryForPDF, PDFGenerator } from './pdf';
import type { Story } from '../types/story';

export async function exportStoryToPDF(story: Story): Promise<void> {
  try {
    const content = formatStoryForPDF(story);
    const generator = new PDFGenerator();
    
    generator.generate(content);
    generator.save(`${story.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw new Error('PDF export failed');
  }
}