type Props = {
  children: React.ReactNode | React.ReactNode[];
};
export const ListBox = ({ children }: Props) => {
  return (
    <div
      role="listbox"
      className={
        'absolute mt-2 max-h-80 w-full overflow-auto rounded-md bg-gray-light p-2'
      }
      tabIndex={-1}
    >
      {children}
    </div>
  );
};
