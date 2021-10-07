import Edit from "../../../components/edit";
import axios from "axios";

const FilmEdit = ({ data }) => {
    const fields = ["id", "title", "description", "release_year", "language_id", "rental_duration", "rental_rate"];
    const entity = "films";
    return (
        <Edit data={data} fields={fields} entity={entity} />
    )
};

const getServerSideProps = async ({ params }) => {
    const { data } = await axios.get(`http://${process.env.BACKEND_URL}/films/${params.id}`);
    return {
        props: { data }
    };
}

export { getServerSideProps };

export default FilmEdit;