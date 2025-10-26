import "./stylesHome.css"
import "./components/Nav.css"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
export const metadata = {
  
  title: "Markov Simulator",
  description: "Frontend para simulación de cadenas de Markov",
    icons: {
    icon: "/algebra.png", 
    viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="terminal-body">
        <NavBar />

      <main className="terminal-main" style={{ paddingTop: "60px" }}>
  {children}
</main>
       <Footer />
      </body>
    </html>
  );
}
