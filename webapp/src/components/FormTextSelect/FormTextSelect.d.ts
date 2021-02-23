interface FormTextSelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string | React.ReactElement;
  caption?: string;
}

export { FormTextSelectProps };
