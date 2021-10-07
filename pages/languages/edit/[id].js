import axios from "axios";

import Edit from "../../../components/edit";

const CategoryEdit = ({ data }) => {
    const fields = ["name"];
    const entity = "categories";
    return (
        <Edit data={data} fields={fields} entity={entity} />
    )
};

const getServerSideProps = async ({ params }) => {
    const { data } = await axios.get(`http://localhost:8000/languages/${params.id}`);
    return {
        props: { data }
    };
}

export { getServerSideProps };

export default CategoryEdit;