export interface ATSResult {
  overallScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  formatScore: number;
  formatIssues: string[];
  suggestions: string[];
}

export const calculateATSScore = (resumeText: string, jobDescription: string, jobSkills: string[]): ATSResult => {
  const resumeLower = resumeText.toLowerCase();
  const jobDescLower = jobDescription.toLowerCase();
  
  // Extract key terms from job description
  const jobWords = jobDescLower
    .split(/[^\w]+/)
    .filter(word => word.length > 3)
    .filter(word => !commonWords.includes(word));
  
  // Combine job skills with extracted terms
  const allKeywords = [...jobSkills.map(s => s.toLowerCase()), ...jobWords]
    .filter((word, index, arr) => arr.indexOf(word) === index); // Remove duplicates
  
  // Check which keywords are present in resume
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];
  
  allKeywords.forEach(keyword => {
    if (resumeLower.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });
  
  // Calculate overall score based on keyword matches
  const keywordScore = (matchedKeywords.length / Math.max(allKeywords.length, 1)) * 100;
  
  // Check resume format
  const formatResult = checkResumeFormat(resumeText);
  
  // Generate suggestions
  const suggestions = generateSuggestions(missingKeywords, formatResult.issues);
  
  return {
    overallScore: Math.round((keywordScore + formatResult.score) / 2),
    matchedKeywords: matchedKeywords.slice(0, 20), // Limit to top 20
    missingKeywords: missingKeywords.slice(0, 15), // Limit to top 15
    formatScore: formatResult.score,
    formatIssues: formatResult.issues,
    suggestions
  };
};

const checkResumeFormat = (resumeText: string): { score: number; issues: string[] } => {
  const issues: string[] = [];
  let score = 100;
  
  // Check for common ATS issues
  if (resumeText.includes('│') || resumeText.includes('┌') || resumeText.includes('└')) {
    issues.push('Remove tables and complex formatting - use simple bullet points');
    score -= 20;
  }
  
  if (resumeText.split('\n').length < 10) {
    issues.push('Resume appears too short - ensure it includes all relevant experience');
    score -= 15;
  }
  
  if (!resumeText.toLowerCase().includes('experience') && !resumeText.toLowerCase().includes('work')) {
    issues.push('Include a clear work experience section');
    score -= 25;
  }
  
  if (!resumeText.toLowerCase().includes('skill')) {
    issues.push('Add a dedicated skills section');
    score -= 20;
  }
  
  if (!/\d{4}/.test(resumeText)) {
    issues.push('Include dates for your work experience and education');
    score -= 15;
  }
  
  // Check for good practices
  if (resumeText.toLowerCase().includes('quantified') || /\d+%/.test(resumeText) || /\$\d+/.test(resumeText)) {
    score += 10; // Bonus for quantified achievements
  }
  
  return { score: Math.max(0, Math.min(100, score)), issues };
};

const generateSuggestions = (missingKeywords: string[], formatIssues: string[]): string[] => {
  const suggestions: string[] = [];
  
  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 5);
    suggestions.push(`Add these important keywords: ${topMissing.join(', ')}`);
  }
  
  if (formatIssues.length > 0) {
    suggestions.push(...formatIssues);
  }
  
  suggestions.push('Use action verbs to start bullet points (e.g., "Developed", "Managed", "Led")');
  suggestions.push('Quantify your achievements with numbers and percentages');
  suggestions.push('Ensure your resume is saved as a .pdf or .docx file');
  
  return suggestions.slice(0, 6); // Limit to 6 suggestions
};

const commonWords = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'man', 'end', 'few', 'got', 'let', 'put', 'say', 'she', 'too', 'use'
];