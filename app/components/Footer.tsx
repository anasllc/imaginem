import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-[10rem] bg-[#fff7f3] text-[#12121299]">
      <div className="w-full h-full flex flex-col items-center justify-evenly text-[.9rem]">
        <ul className="capitalize flex justify-between items-center w-[25rem] h-[4rem]">
          <li>
            <Link href="/" className="underline">
              disclaimer
            </Link>
          </li>
          <li>
            <Link href="/" className="underline">
              home
            </Link>
          </li>
          <li>
            <Link href="/" className="underline">
              how-to guide
            </Link>
          </li>
        </ul>
        <p className="capitalize">
          © {new Date().getFullYear()} coinwaft. all right reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
