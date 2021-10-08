import axios from "axios";

import Edit from "../../../components/edit";

const fields = {
    "languages": ["id", "name", "last_update"],
    "films": ["id", "title", "description", "release_year", "language_id", "rental_duration", "rental_rate"],
    "categories": ["name"]
}

const EntityEdit = ({ entity, data }) => {
    return (
        <Edit data={data} fields={fields[entity]} entity={entity} />
    )
};

const getServerSideProps = async (context) => {
    const { entity, id } = context.query;
    const { data } = await axios.get(`http://${process.env.BACKEND_URL}/${entity}/${id}`);
    return {
        props: { entity, id, data }
    };
}

// export { getStaticProps, getStaticPaths };

export { getServerSideProps };

export default EntityEdit;