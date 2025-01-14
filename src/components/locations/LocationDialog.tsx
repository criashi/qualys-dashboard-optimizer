import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Location } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  region: z.string().min(1, "Please select a region"),
  assetGroups: z.array(z.string()).min(1, "Please select at least one asset group"),
});

interface LocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location?: Location;
}

export const LocationDialog: React.FC<LocationDialogProps> = ({
  open,
  onOpenChange,
  location,
}) => {
  // Mock function for fetching asset groups - replace with actual API call later
  const fetchAssetGroups = async () => {
    // This would be replaced with actual API call to Qualys
    return [
      { id: "ag1", name: "Asset Group 1" },
      { id: "ag2", name: "Asset Group 2" },
      { id: "ag3", name: "Asset Group 3" },
    ];
  };

  const { data: assetGroups, isLoading } = useQuery({
    queryKey: ['assetGroups'],
    queryFn: fetchAssetGroups,
    enabled: open, // Only fetch when dialog is open
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: location?.name || "",
      region: location?.region || "",
      assetGroups: location?.assetGroups.map(ag => ag.id) || [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{location ? "Edit Location" : "Add New Location"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="na">North America</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <div>Loading asset groups...</div>
            ) : (
              <FormField
                control={form.control}
                name="assetGroups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Groups</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange([...field.value, value])}
                      value={field.value[0]}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset groups" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {assetGroups?.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Location</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};