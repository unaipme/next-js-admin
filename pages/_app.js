import styles from "./_app.module.css";
import "./global.css";

import Layout from "../components/layout"

const App = ({ Component, pageProps }) => {
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