export interface ActivityCardProps {
  activity: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
    images: string[] | null;
  };
}
