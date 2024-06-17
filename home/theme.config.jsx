const YEAR = new Date().getFullYear();

const meta = {
  title: "ColorOfLight",
  description: "ColorOfLight(Seongho Park)'s personal page.",
  image: "",
};

const head = () => (
  <>
    <title>{meta.title}</title>
    <meta name="robots" content="follow, index" />
    <meta name="description" content={meta.description} />
    <meta property="og:site_name" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:image" content={meta.image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@yourname" />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={meta.image} />
  </>
);

export default {
  footer: <p>{YEAR} © ColorOfLight</p>,
  head,
  darkMode: true,
};
