import "@/styles/globals.css";
import "@/styles/tailwind.css";
import { Layout } from "@/components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <div className="content container mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
