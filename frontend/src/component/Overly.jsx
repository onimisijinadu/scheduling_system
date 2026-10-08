export const Overlay = ({ isOverly, onClose, rel }) => {
  return (
    <div
      rel={rel}
      onClick={onClose}
      className={`absolute w-full h-full z-20 bg-black/10 inset-0 ${isOverly ? "block" : "hidden"}`}
    ></div>
  );
};
