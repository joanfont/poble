import React from "react";
import Emoji from "@teuteuf/react-emoji-render";

let protocol = "https";

// eslint-disable-next-line no-restricted-globals
if (typeof location !== "undefined" && location.protocol === "http:") {
  protocol = "http";
}

export function MyEmoji({ children, ...rest }: any) {
  const options = {
    protocol,
    baseUrl: "//cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
    ext: "png",
    size: "72x72",
  };

  return <Emoji options={options} {...rest} />;
}
