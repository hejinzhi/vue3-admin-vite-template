export interface CommonProps {
  id: number;
  createdAt: string;
  disabled: string;
  updatedAt: string;
}

export interface PagenationProps<T> {
  rows: Array<T>;
  total: number;
}

export interface DeleteCommonProps {
  affected: number;
  generatedMaps: Array<any>;
  raw: any;
}
