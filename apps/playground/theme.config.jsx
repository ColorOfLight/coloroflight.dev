import Image from "next/image";

import LogoImage from "@repo/common-assets/images/logo.svg";

const Logo = () => (
  <div className="flex gap-4 items-center">
    <Image src={LogoImage.src} width={32} height={32} alt="ColorOfLight Logo" />
    <h1 className="font-bold">Playground</h1>
  </div>
);

export default {
  logo: <Logo />,
  project: {
    link: 'https://github.com/ColorOfLight/coloroflight.dev/tree/main/apps/playground'
  }
  // ... other theme options
}
