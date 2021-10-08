import axios from "axios";
import DataTable from "../../components/datatable";

const fields = {
    "languages": ["id", "name", "last_update"],
    "films": ["id", "title", "description", "release_year", "language_id", "rental_duration", "rental_rate"],
    "categories": ["name"]
}

const EntityList = ({ entity, data }) => {
    return (
        <DataTable data={data} entity={entity} fields={fields[entity]} />
    )
};

const getServerSideProps = async (context) => {
    const { entity } = context.query;
    const { data } = await axios.get(`http://${process.env.BACKEND_URL}/${entity}`);
    return {
        props: { entity, data }
    };
}

export default EntityList;

export { getServerSideProps };