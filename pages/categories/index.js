import axios from "axios";
import DataTable from "../../components/datatable";

const Categories = ({ data }) => {
    const fields = ["name"];
    return (
        <DataTable data={data} fields={fields} entity="categories" />
    )
}

const getServerSideProps = async (context) => {
    const { data } = await axios.get(`http://${process.env.BACKEND_URL}/categories`);
    return {
        props: { data }
    }
};

export { getServerSideProps }

export default Categories;