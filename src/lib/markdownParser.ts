/**
 * Helper to check if a string contains HTML tags
 */
export const isHTML = (str: string): boolean => {
  return /<[a-z][\s\S]*>/i.test(str);
};

/**
 * A lightweight, premium Markdown-to-HTML parser designed specifically
 * to map Notion/Markdown-like syntax into Active Fox brand-styled HTML.
 */
export const parseMarkdownToHTML = (md: string): string => {
  if (!md) return '';
  
  // Return if it's already HTML (legacy/expert mode compatibility)
  if (isHTML(md)) {
    return md;
  }

  // Split content by lines
  const lines = md.split('\n');
  let inList = false;
  
  const htmlLines = lines.map((line) => {
    // Process inline bold text first: **bold text** -> <strong>bold text</strong>
    let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#2c1d11]">$1</strong>');
    
    // Process inline links: [Link Text](URL) -> <a href="URL" ...>Link Text</a>
    processedLine = processedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-brand-orange hover:underline font-semibold transition-colors">$1</a>');
    
    const trimmed = processedLine.trim();

    // Handle empty line
    if (!trimmed) {
      if (inList) {
        inList = false;
        return '</ul>';
      }
      return '';
    }

    // Heading H2: ## Subheading
    if (trimmed.startsWith('## ')) {
      let prefix = '';
      if (inList) {
        prefix = '</ul>';
        inList = false;
      }
      return `${prefix}<h2 class="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">${trimmed.substring(3)}</h2>`;
    }

    // Heading H3: ### Subheading
    if (trimmed.startsWith('### ')) {
      let prefix = '';
      if (inList) {
        prefix = '</ul>';
        inList = false;
      }
      return `${prefix}<h3 class="text-xl md:text-2xl font-monument text-[#2c1d11] mt-8 mb-4 uppercase tracking-tight">${trimmed.substring(4)}</h3>`;
    }

    // Bullet Lists: * Item or - Item
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      let prefix = '';
      if (!inList) {
        prefix = '<ul class="list-disc pl-2 space-y-3 my-6 text-neutral-500 font-sans font-light">';
        inList = true;
      }
      return `${prefix}<li class="flex items-start gap-2.5"><span class="text-[#bd7a58] font-bold mt-1 text-xs">•</span><span class="text-neutral-500 leading-relaxed font-sans">${trimmed.substring(2)}</span></li>`;
    }

    // Blockquote: > Quotation
    if (trimmed.startsWith('> ')) {
      let prefix = '';
      if (inList) {
        prefix = '</ul>';
        inList = false;
      }
      return `${prefix}<blockquote class="my-8 pl-6 border-l-4 border-brand-orange italic text-[#bd7a58] font-sans font-light text-base md:text-lg bg-neutral-50 py-4 pr-4 rounded-r-xl">${trimmed.substring(2)}</blockquote>`;
    }

    // Default Paragraph
    let prefix = '';
    if (inList) {
      prefix = '</ul>';
      inList = false;
    }
    return `${prefix}<p class="mb-6 font-sans font-light text-neutral-500 leading-relaxed text-sm md:text-base">${trimmed}</p>`;
  });

  // Safe close for any active list at the end of the text
  if (inList) {
    htmlLines.push('</ul>');
  }

  return htmlLines.filter(line => line !== '').join('\n');
};
