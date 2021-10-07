import axios from "axios";

import Edit from "../../../../components/edit";

const fields = {
    "languages": ["id", "name", "last_update"],
    "films": ["id", "title", "description", "release_year", "language_id", "rental_duration", "rental_rate"],
    "categories": ["name"]
}

const LanguageEdit = ({ entity, data }) => {
    return (
        <Edit data={data} fields={fields[entity]} entity={entity} />
    )
};

const getStaticProps = async (props) => {
    const { params: { entity, id } } = props;
    const { data } = await axios.get(`http://${process.env.BACKEND_URL}/${entity}/${id}`);
    return {
        props: { entity, data }
    };
}

const getStaticPaths = async (props) => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export { getStaticProps, getStaticPaths };

export default LanguageEdit;