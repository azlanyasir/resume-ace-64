import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { jobListings } from "@/data/jobs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Calendar, DollarSign, Building, CheckCircle, Upload } from "lucide-react";
import NotFound from "./NotFound";

export const JobDetail = () => {
  const { jobId } = useParams();
  const job = jobListings.find(j => j.id === jobId);

  if (!job) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="p-6 bg-gradient-card">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-card-foreground mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="h-5 w-5" />
                    <span className="text-lg font-medium">{job.company}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
              </div>
            </Card>

            {/* Job Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About this role</h2>
              <p className="text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </Card>

            {/* Responsibilities */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Section */}
            <Card className="p-6 bg-gradient-primary text-primary-foreground">
              <h3 className="text-lg font-semibold mb-4">Ready to Apply?</h3>
              <p className="text-primary-foreground/90 mb-6 text-sm">
                Check how well your resume matches this job before applying
              </p>
              <div className="space-y-3">
                <Link to={`/jobs/${job.id}/ats-check`} className="block">
                  <Button variant="secondary" className="w-full" size="lg">
                    <Upload className="h-4 w-4 mr-2" />
                    ATS Resume Check
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  Apply Directly
                </Button>
              </div>
            </Card>

            {/* Company Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">About {job.company}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                A leading technology company focused on innovation and growth. Join our team of talented professionals making a difference.
              </p>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="font-medium">Technology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Size</span>
                  <span className="font-medium">500-1000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founded</span>
                  <span className="font-medium">2015</span>
                </div>
              </div>
            </Card>

            {/* Similar Jobs */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {jobListings
                  .filter(j => j.id !== job.id)
                  .slice(0, 3)
                  .map((similarJob) => (
                    <Link 
                      key={similarJob.id} 
                      to={`/jobs/${similarJob.id}`}
                      className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium text-sm line-clamp-1">{similarJob.title}</h4>
                      <p className="text-xs text-muted-foreground">{similarJob.company}</p>
                    </Link>
                  ))
                }
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};