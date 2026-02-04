import Header from "./Header";
import "../styles/layout.css";

export default function Layout({ children, activePage, setActivePage }: any) {
  return (
    <>
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="app-content ">{children}</main>
    </>
  );
}
