import "styles/components/spinner.scss";

export function Spinner() {
  return (
    <div data-cy="spinner" className="spinner">
      <div></div>
      <div></div>
    </div>
  );
}
