import FaviconImage from "@repo/common-assets/images/logo-favicon.svg";

const YEAR = new Date().getFullYear();

const meta = {
  title: "ColorOfLight",
  description: "ColorOfLight's personal page.",
  image: FaviconImage.src,
};

const head = () => (
  <>
    <title>{meta.title}</title>

    <link rel="icon" href={meta.image} type="image/svg+xml" />

    <meta name="robots" content="follow, index" />
    <meta name="description" content={meta.description} />
    <meta property="og:site_name" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:image" content={meta.image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ColorOf_Light" />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={meta.image} />
  </>
);

const footer = (
  <>
  <hr></hr>
  <footer>
    <p>Powered by Nextra</p>
    <p className="text-right">{YEAR} © ColorOfLight (Seongho Park)</p>
  </footer>
  </>
);

export default {
  footer,
  head,
  darkMode: true,
};
