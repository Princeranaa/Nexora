const SegmentButton = ({ value, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 rounded-md py-1.5 text-sm font-medium transition-colors
        ${
          selected
            ? "bg-[#d0bcff] text-[#211d2a] font-semibold"
            : "text-gray-400 hover:text-gray-200"
        }
      `}
    >
      {value}
    </button>
  );
};

export default SegmentButton;
