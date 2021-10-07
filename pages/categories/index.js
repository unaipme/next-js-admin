import axios from "axios";
import DataTable from "../../components/datatable";

const Categories = ({ data }) => {
    const fields = ["name"];
    return (
        <>
            <h2 className="page_title">Categories</h2> 
            <DataTable data={data} fields={fields} />
        </>
    )
}

const getServerSideProps = async (context) => {
    const { data } = await axios.get("http://127.0.0.1:8000/categories");
    return {
        props: { data }
    }
};

export { getServerSideProps }

export default Categories;