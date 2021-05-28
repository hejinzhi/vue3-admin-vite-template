export interface CommonProps {
  id: number;
  createdAt?: string;
  disabled?: string;
  updatedAt?: string;
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

export interface FormProps {
  validate: (valid: (v: boolean) => void) => void;
  clearValidate: () => void;
}

export interface FieldErrorList {
  [field: string]: ValidateError[];
}

export interface ValidateError {
  message: string;
  field: string;
}

export interface ValidateFieldCallback {
  (isValid?: boolean, invalidFields?: FieldErrorList): void;
}

export interface ElFormContext {
  validate(callback?: ValidateFieldCallback): void;
  updateComputedLabelWidth(width: number): void;
  addValidateEvents(): void;
  removeValidateEvents(): void;
  resetFields(): void;
  clearValidate(): void;
}
