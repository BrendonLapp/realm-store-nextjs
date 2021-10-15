interface SubmitButtonProps {
  submitAction: any;
  name: string;
}

const SubmitButton = ({ submitAction, name }: SubmitButtonProps) => {
  return (
    <button
      className="btn btn-outline-success my-2 my-sm-0"
      type="submit"
      onClick={submitAction}
    >
      {name}
    </button>
  );
};

export default SubmitButton;
