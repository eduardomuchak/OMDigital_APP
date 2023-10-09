interface Image {
  base64: string;
  fileName: string | undefined;
}

export interface SaveRequest {
  asset_code: string;
  counter: string;
  report: string;
  resp_id: number;
  status: string;
  images: Image[];
}
