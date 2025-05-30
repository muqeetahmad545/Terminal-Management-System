export interface Organization {
  id?: string | number | any;
  uuid?: string | number | any;
  name: string;
  country?: string;
  state?: string;
  language?: string;
  postal_code?: string;
  address?: string;
  currency?: string;
  email?: string;
  phone?: string;
  status?: string;
  description?: string;
}

export interface SuccessReponseInterface {
  data: Organization;
  message: string;
  status: string;
}

export type OrganizationErrors = {
  [key in keyof Organization]?: string;
};
