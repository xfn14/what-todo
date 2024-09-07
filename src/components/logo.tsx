import Link from "next/link";
import React from "react";

export const Logo = () => {
  const fontShadowBlack = {
    WebkitTextStroke: "1px #000",
  };

  const fontShadowWhite = {
    WebkitTextStroke: "1px #fff",
  };

  return (
    <>
      <div className="hidden md:flex">
        <div className="text-center transition hover:opacity-75">
          <h1
            style={fontShadowBlack}
            className="font-bogart text-4xl font-bold uppercase dark:hidden"
          >
            What-Todo
          </h1>

          <h1
            style={fontShadowBlack}
            className="font-bogart hidden text-4xl font-bold uppercase dark:block"
          >
            What-Todo
          </h1>
        </div>
      </div>

      <div className="flex md:hidden">
        <div className="text-center transition hover:opacity-75">
          <h1
            style={fontShadowWhite}
            className="font-bogart text-4xl font-bold uppercase"
          >
            WT
          </h1>
        </div>
      </div>
    </>
  );
};
