import axios from "axios";

import Edit from "../../../components/edit";

const LanguageEdit = ({ data }) => {
    const fields = ["id", "name", "last_update"];
    const entity = "languages";
    return (
        <Edit data={data} fields={fields} entity={entity} />
    )
};

const getServerSideProps = async ({ params }) => {
    const { data } = await axios.get(`http://${process.env.BACKEND_URL}/languages/${params.id}`);
    return {
        props: { data }
    };
}

export { getServerSideProps };

export default LanguageEdit;