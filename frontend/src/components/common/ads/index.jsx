// <!-- index.html inside public folder -->
// <script data-ad-client="ca-pub-XXXXXXXXXXXX" async
//         src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>


import React, { useEffect } from "react";

// slot = your AdSense ad unit ID
// style = can be {width: '100%', height: 100} for desktop/mobile adaptation

const Ad = ({ slot, style }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client="ca-pub-XXXXXXXXXXXX" // your AdSense ID
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default Ad;
