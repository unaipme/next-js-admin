import http from "../../../services/http";
import entities from "../../../public/schema";
import Edit from "../../../components/edit";

const EntityEdit = ({ entity, data }) => {
    return (
        <Edit data={data} fields={entities[entity].fields} entity={entity} />
    )
};

const getServerSideProps = async (context) => {
    const { entity, id } = context.query;
    const client = http(entity);
    const data = await (await client.getEntityInstanceById(id)).json();
    return {
        props: { entity, id, data }
    };
}

// export { getStaticProps, getStaticPaths };

export { getServerSideProps };

export default EntityEdit;