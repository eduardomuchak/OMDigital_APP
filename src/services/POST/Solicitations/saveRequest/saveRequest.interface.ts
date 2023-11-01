interface Image {
  name: (string | undefined)[];
  tmp_name: (string | undefined)[];
  base64: string[];
}

export interface SaveRequest {
  asset_code: string;
  counter: string;
  report: string;
  resp_id: number;
  status: string;
  images?: Image;
}
