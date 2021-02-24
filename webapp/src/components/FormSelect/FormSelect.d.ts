interface optionsProps {
  text: string;
  value: bool | string | number;
}

interface FormSelectProps {
  name: string;
  label: string | React.ReactElement;
  id: string;
  placeholder: string;
  options: Array<optionsProps>;
  disabled: boolean;
}

export { FormSelectProps };
