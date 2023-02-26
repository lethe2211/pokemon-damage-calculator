import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-[#E4021C] p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <span className="font-semibold text-xl tracking-tight">
              ポケモンSVダメージ計算ツール
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
