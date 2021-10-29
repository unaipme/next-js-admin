import Create from "../../../components/create";

const fields = {
    "languages": ["id", "name", "last_update"],
    "films": ["id", "title", "description", "release_year", "language_id", "rental_duration", "rental_rate"],
    "categories": ["name"]
};

const EntityCreate = ({ entity }) => {
    return (
        <Create fields={fields[entity]} entity={entity} />
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