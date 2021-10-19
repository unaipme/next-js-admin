import { useRouter } from "next/router";
import { useEffect } from "react";
import nProgress from "nprogress";

import styles from "./_app.module.css";
import "./global.css";

import Layout from "../components/layout"

const App = ({ Component, pageProps }) => {
    const router = useRouter();

    useEffect(() => {
        const handleStart = (url) => {
            console.log("Starting", url)
            nProgress.start();
        }
        const handleStop = () => {
            console.log("Ending")
            nProgress.done();
        }

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeError", handleStop);
        router.events.on("routeChangeComplete", handleStop);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeError", handleStop);
            router.events.off("routeChangeComplete", handleStop);
        };
    }, [router]);
    
    return (
        <div className={styles.layout}>
            <div className={styles.layout_header}>
                This could be the header
            </div>
            <div style={{ height: "100%" /* , overflow: "hidden" */ }}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </div>
    )
};

export default App;