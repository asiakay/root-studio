export interface Service {
  icon: string;
  name: string;
  description: string;
  price: string;
}

export interface CustomApp {
  icon: string;
  name: string;
  description: string;
  link?: string;
  linkLabel: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}
