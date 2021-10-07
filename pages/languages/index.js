import axios from "axios";
import DataTable from "../../components/datatable";

const Languages = ({ data }) => {
    const fields = ["id", "name", "last_update"];
    const entity = "languages";
    return (
        <DataTable data={data} fields={fields} entity={entity} />
    )
}

const getServerSideProps = async (context) => {
    const { data } = await axios.get(`http://${process.env.BACKEND_URL}/languages`);
    return {
        props: { data }
    }
};

export { getServerSideProps };

export default Languages;