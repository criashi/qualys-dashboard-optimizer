import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LocationTable } from "@/components/locations/LocationTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchLocations } from "@/lib/api";
import { LocationDialog } from "@/components/locations/LocationDialog";
import { useToast } from "@/components/ui/use-toast";
import { Location } from "@/types/api";

const Locations = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<Location | undefined>();
  const { toast } = useToast();

  const { data: locations, isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  });

  const handleEdit = (location: Location) => {
    setSelectedLocation(location);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Location Management</h2>
          <Button onClick={() => {
            setSelectedLocation(undefined);
            setIsDialogOpen(true);
          }} className="space-x-2">
            <PlusCircle className="w-4 h-4" />
            <span>Add Location</span>
          </Button>
        </div>

        <LocationTable 
          locations={locations || []} 
          onEdit={handleEdit}
        />
        <LocationDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
          location={selectedLocation}
        />
      </div>
    </DashboardLayout>
  );
};

export default Locations;