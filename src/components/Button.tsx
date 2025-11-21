export default function Button({ children, onCLick, className }) {
  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-4xl hover:cursor-pointer col-span-2 transition duration-150 ease-in-out">
      Sepete Ekle
    </button>
  );
}
