import axios from "axios";
import DataTable from "../../components/datatable";

const Films = ({ data }) => {
    const fields = ["id", "title", "description", "release_year", "language_id", "rental_duration", "rental_rate"];
    return (
        <DataTable data={data} fields={fields} entity={"films"} />
    )
}

const getServerSideProps = async (context) => {
    const { data } = await axios.get(`http://${process.env.BACKEND_URL}/films`);
    return {
        props: { data }
    }
};

export { getServerSideProps };

export default Films;