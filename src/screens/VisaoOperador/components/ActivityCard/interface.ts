export interface ActivityCardProps {
  activity: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
    images?: string[] | null;
  };
}
