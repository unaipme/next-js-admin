import axios from "axios";
import DataTable from "../../components/datatable";

const Films = ({ data }) => {
    const fields = ["id", "title", "description", "release_year", "language_id", "rental_duration", "rental_rate"];
    return (
        <>
            <h2 className="page_title">Films</h2>
            <DataTable data={data} fields={fields} entity={"films"} />
        </>
    )
}

const getServerSideProps = async (context) => {
    const { data } = await axios.get("http://127.0.0.1:8000/films");
    return {
        props: { data }
    }
};

export { getServerSideProps };

export default Films;