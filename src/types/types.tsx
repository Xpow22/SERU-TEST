export interface FormData {
    firstName: string;
    lastName: string;
    biodata: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    selfie?: string | null;
    ktp?: string | null;
    freePhoto?: string | null;
  }
  
  export type NextStepFunction = (data: Partial<FormData>) => void;
  