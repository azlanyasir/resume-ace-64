import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { jobListings } from "@/data/jobs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, FileText, Download, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import { calculateATSScore, ATSResult } from "@/utils/atsChecker";
import NotFound from "./NotFound";

export const ATSCheck = () => {
  const { jobId } = useParams();
  const job = jobListings.find(j => j.id === jobId);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [atsResult, setATSResult] = useState<ATSResult | null>(null);
  const { toast } = useToast();

  if (!job) {
    return <NotFound />;
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf') && !file.type.includes('word') && !file.type.includes('document')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    setUploading(true);

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll use dummy text
      const resumeText = `
        John Doe
        Software Engineer
        
        Experience:
        Senior Developer at Tech Company (2020-2024)
        - Developed web applications using React and Node.js
        - Led team of 5 developers
        - Increased performance by 40%
        
        Skills: JavaScript, Python, React, Node.js, AWS, Git
        
        Education:
        Bachelor of Computer Science, 2020
      `;
      
      const jobDescription = `${job.description} ${job.responsibilities.join(' ')} ${job.requirements.join(' ')}`;
      const result = calculateATSScore(resumeText, jobDescription, job.skills);
      
      setATSResult(result);
      toast({
        title: "Analysis complete!",
        description: `Your resume scored ${result.overallScore}% for this position`
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error processing your resume",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    if (score >= 40) return "Fair Match";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to={`/jobs/${job.id}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Job Details
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">ATS Resume Checker</h1>
            <p className="text-muted-foreground">
              Check how well your resume matches the <span className="font-semibold">{job.title}</span> position at {job.company}
            </p>
          </div>

          {!atsResult ? (
            /* Upload Section */
            <Card className="p-8 text-center bg-gradient-card">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Upload Your Resume</h2>
                <p className="text-muted-foreground mb-6">
                  Upload your resume to see how well it matches this job description
                </p>
                
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                  disabled={uploading}
                />
                
                <label htmlFor="resume-upload">
                  <Button 
                    variant="premium" 
                    size="lg" 
                    className="cursor-pointer"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Choose File
                      </>
                    )}
                  </Button>
                </label>
                
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Selected: {selectedFile.name}
                  </p>
                )}
                
                <p className="text-xs text-muted-foreground mt-4">
                  Supports PDF and Word documents (max 10MB)
                </p>
              </div>
            </Card>
          ) : (
            /* Results Section */
            <div className="space-y-6">
              {/* Overall Score */}
              <Card className="p-6 bg-gradient-card">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(atsResult.overallScore)}`}>
                    {atsResult.overallScore}%
                  </div>
                  <p className="text-lg font-medium mb-4">{getScoreLabel(atsResult.overallScore)}</p>
                  <Progress value={atsResult.overallScore} className="max-w-md mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Your resume matches {atsResult.overallScore}% of the requirements for this position
                  </p>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Matched Keywords */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <h3 className="text-lg font-semibold">Matched Keywords</h3>
                    <Badge variant="secondary">{atsResult.matchedKeywords.length}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {atsResult.matchedKeywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-success border-success/20 bg-success-bg">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Missing Keywords */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <h3 className="text-lg font-semibold">Missing Keywords</h3>
                    <Badge variant="secondary">{atsResult.missingKeywords.length}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {atsResult.missingKeywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-warning border-warning/20 bg-warning-bg">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Format Analysis */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Format Analysis</h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-muted-foreground">ATS-Friendly Score:</span>
                  <div className={`font-semibold ${getScoreColor(atsResult.formatScore)}`}>
                    {atsResult.formatScore}%
                  </div>
                  <Progress value={atsResult.formatScore} className="flex-1 max-w-sm" />
                </div>
                
                {atsResult.formatIssues.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Format Issues:</h4>
                    <ul className="space-y-1">
                      {atsResult.formatIssues.map((issue, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>

              {/* Suggestions */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Improvement Suggestions</h3>
                </div>
                <ul className="space-y-3">
                  {atsResult.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setATSResult(null);
                    setSelectedFile(null);
                  }}
                >
                  Upload New Resume
                </Button>
                <Button variant="secondary">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="premium">
                  Apply for Position
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};