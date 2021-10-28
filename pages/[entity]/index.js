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
    const data = await (await fetch(`http://${process.env.BACKEND_URL}/api/${entity}`)).json();
    return {
        props: { entity, data }
    };
}

export default EntityList;

export { getServerSideProps };