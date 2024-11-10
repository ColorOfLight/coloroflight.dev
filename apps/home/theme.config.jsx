import FaviconImage from "@repo/common-assets/images/logo-favicon.svg";
import { useBlogContext } from "nextra-theme-blog";

const YEAR = new Date().getFullYear();

const meta = {
  title: "ColorOfLight",
  description: "ColorOfLight's personal page & blog.",
  image: FaviconImage.src,
};

const head = () => {
  const { opts } = useBlogContext();

  const title = opts?.frontMatter?.title ?? meta.title;
  const description = opts?.frontMatter?.description ?? meta.description;
  const image = opts?.frontMatter?.image ?? meta.image;

  return (
    <>
      <title>{title}</title>

      <link rel="icon" href={image} type="image/svg+xml" />

      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ColorOf_Light" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

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
