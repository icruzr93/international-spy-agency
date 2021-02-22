interface FormTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string | React.ReactElement;
  caption?: string;
}

export { FormTextInputProps };
