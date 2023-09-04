export interface Status {
  id: number;
  description: string;
  property: string;
}

export interface StatusWithBgColor extends Status {
  color: string;
}
