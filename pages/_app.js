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

/*
const generate = (fields, entity) => {
    return {
        component: ({ data }) => (
            <>
                <h2 className="page_title">Languages</h2>
                <DataTable data={data} fields={fields} entity={entity} />
            </>
        ),
        getServerSideProps: async (context) => {
            const { data } = await axios.get(`http://${process.env.BACKEND_URL}/${entity}`);
            return {
                props: { data }
            }
        }
    }
}; */