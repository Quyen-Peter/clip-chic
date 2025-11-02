export interface Base {
  id: number;
  name: string;
  color: string;
  price: number;
  imageId?: number;
  modelId?: number;
}

export interface Charm {
  id: number;
  name: string;
  price: number;
  imageId?: number;
  modelId?: number;
}

export interface Product {
  id: number;
  collectId?: number;
  title: string;
  descript?: string;
  baseId: number;
  price: number;
  userId: number;
  stock: number;
  createDate: string;
  status: string;
}

export interface ProductCreateRequest {
  collectId?: number;
  title: string;
  descript?: string;
  baseId: number;
  price: number;
  userId: number;
  stock?: number;
  status?: string;
}

export interface CustomizationCharm {
  charmId: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export interface CustomizationConfig {
  baseId: number;
  baseModelColor?: string;
  charms: CustomizationCharm[];
}
