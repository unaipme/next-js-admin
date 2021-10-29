import Create from "../../../components/create";

import entities from "../../../public/schema";

const EntityCreate = ({ entity }) => {
    const fields = entities[entity].fields;
    return (
        <Create fields={fields} entity={entity} />
    )
};

const getStaticProps = async (context) => {
    const { entity } = context.params;
    return {
        props: { entity }
    };
}

const getStaticPaths = async () => {
    return {
        paths: [ ],
        fallback: "blocking"
    };
}

export { getStaticProps, getStaticPaths };

export default EntityCreate;