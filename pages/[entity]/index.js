import axios from "axios";
import DataTable from "../../components/datatable";

import entities from "../../public/schema.js";

const EntityList = ({ entity, data }) => {
    const { fields } = entities[entity];
    return (
        <DataTable data={data} entity={entity} fields={fields} />
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