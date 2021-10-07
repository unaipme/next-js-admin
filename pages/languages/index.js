import axios from "axios";
import DataTable from "../../components/datatable";

const Languages = ({ data }) => {
    const fields = ["id", "name", "last_update"];
    return (
        <>
            <h2 className="page_title">Languages</h2>
            <DataTable data={data} fields={fields} />
        </>
    )
}

const getServerSideProps = async (context) => {
    const { data } = await axios.get("http://127.0.0.1:8000/languages");
    return {
        props: { data }
    }
};

export { getServerSideProps };

export default Languages;