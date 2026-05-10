export const metadata = { title: "Wayra — Seu guia de viagem inteligente" };
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
