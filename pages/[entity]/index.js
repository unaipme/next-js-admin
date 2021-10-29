import http from "../../services/http";
import entities from "../../public/schema.js";
import styles from "./view.module.css";

import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import View from "../../components/view";
import { useRouter } from "next/router";
import pluralize from "pluralize";

const EntityList = ({ entity, data }) => {
    const { fields } = entities[entity];
    const router = useRouter();
    
    return (
        <>
            <div className={styles.title_container}>
                <div className={styles.page_title}>List of {pluralize(entity)}</div>
                <div>
                    <Button variant="text"
                            startIcon={ <AddIcon /> }
                            onClick={() => router.push(`/${entity}/create`)}>Create</Button>
                </div>
            </div>
            <View data={data} entity={entity} fields={fields} />
        </>
    )
};

const getServerSideProps = async (context) => {
    const { entity } = context.query;
    const client = http(entity);
    const data = await (await client.getEntity()).json();
    return {
        props: { entity, data }
    };
}

export default EntityList;

export { getServerSideProps };