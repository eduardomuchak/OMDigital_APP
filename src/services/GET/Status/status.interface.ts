export interface Status {
  id: number;
  description: string;
}

export interface StatusWithBgColor extends Status {
  color: string;
}
