import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { jobListings } from "@/data/jobs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

export const JobBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredJobs = jobListings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Discover opportunities that match your skills with our AI-powered ATS checker
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-surface/10 backdrop-blur-sm rounded-xl p-2 border border-primary-foreground/20">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-surface border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button variant="secondary" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="default">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {filteredJobs.length} Jobs Available
              </h2>
              <p className="text-muted-foreground">
                Find the perfect role that matches your expertise
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No jobs found matching your search criteria
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};