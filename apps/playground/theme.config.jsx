import Image from "next/image";
import { useRouter } from "next/router";

import LogoImage from "@repo/common-assets/images/logo.svg";
import FaviconImage from "@repo/common-assets/images/logo-favicon.svg";

const Logo = () => (
  <div className="flex gap-4 items-center">
    <Image src={LogoImage.src} width={32} height={32} alt="ColorOfLight Logo" />
    <h1 className="font-bold">Playground</h1>
  </div>
);

const metaDefault = {
  title: "ColorOfLight",
  description: "ColorOfLight's playground page.",
  image: FaviconImage.src,
};

const head = () => (
  <>
    <link rel="icon" href={metaDefault.image} type="image/svg+xml" />

    <meta name="robots" content="follow, index" />
    <meta name="description" content={metaDefault.description} />
    <meta property="og:site_name" content={metaDefault.title} />
    <meta property="og:description" content={metaDefault.description} />
    <meta property="og:title" content={metaDefault.title} />
    <meta property="og:image" content={metaDefault.image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ColorOf_Light" />
    <meta name="twitter:title" content={metaDefault.title} />
    <meta name="twitter:description" content={metaDefault.description} />
    <meta name="twitter:image" content={metaDefault.image} />
  </>
);

const footerText = (
  <footer>MIT {new Date().getFullYear()} © ColorOfLight</footer>
);

export default {
  logo: <Logo />,
  project: {
    link: "https://github.com/ColorOfLight/coloroflight.dev/tree/main/apps/playground",
  },
  head,
  footer: { text: footerText },
  toc: {
    component: null,
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – ColorOfLight",
      };
    }
  },
};
