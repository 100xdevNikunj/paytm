function Appbar(props) {
  const name = props.name || '';
  const firstCharacter = name ? name[0].toUpperCase() : '';

  return (
    <div className="flex flex-row justify-between shadow h-14">
        <div className="flex flex-row items-center justify-center ml-4">PayTM APP</div>
        <div className="flex flex-row items-center justify-center gap-3 mr-4">
          <div>{name}</div>
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">{firstCharacter}</span>
          </div>
        </div>
    </div>
  );
}
export default Appbar