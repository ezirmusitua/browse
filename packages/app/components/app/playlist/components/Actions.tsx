import Random from "./Random";

function Action({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-2">
      <button
        className={`${color} w-[32px] h-[32px] shadow-md rounded-full text-white text-[24px] font-bold hover:animate-spin`}
      >
        {children}
      </button>
    </div>
  );
}

function Actions() {
  return (
    <div className="fixed bottom-8 right-8">
      <Action color="bg-transparent">
        <Random></Random>
      </Action>
    </div>
  );
}

export default Actions;
