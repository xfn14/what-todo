export const Banner = () => {
  const fontShadow = {
    WebkitTextStroke: "2px #fff",
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10 text-center">
      <p className="font-bogart w-full pb-4 text-xl uppercase tracking-[.6em]">
        Keep track of your tasks and know
      </p>

      <h1
        style={fontShadow}
        className="font-bogart text-9xl font-bold uppercase text-black"
      >
        What-Todo
      </h1>
    </div>
  );
};
