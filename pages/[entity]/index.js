import http from "../../services/http";

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
    const client = http(entity);
    const data = await (await client.getEntity()).json();
    return {
        props: { entity, data }
    };
}

export default EntityList;

export { getServerSideProps };