import { Job } from "@/data/jobs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Building } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="p-6 hover:shadow-card-hover transition-all duration-300 bg-gradient-card border-border/50">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-card-foreground hover:text-primary transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
          <Badge variant="secondary" className="font-medium">
            {job.type}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{job.posted}</span>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Link to={`/jobs/${job.id}`} className="flex-1">
            <Button variant="default" className="w-full">
              View Details
            </Button>
          </Link>
          <Link to={`/jobs/${job.id}/ats-check`}>
            <Button variant="outline" className="whitespace-nowrap">
              ATS Check
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};