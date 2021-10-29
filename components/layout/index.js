import styles from "./layout.module.scss";
import entities from "../../public/schema";

import Link from "next/link";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import pluralize from "pluralize";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import DashboardIcon from '@mui/icons-material/Dashboard';

const title = (str) => str.slice(0, 1).toUpperCase().concat(str.slice(1));

const PageEntry = ({ name, url, Icon, selected }) => {
    return (
        <Link href={url}>
            <div className={selected === true ? styles.selected_page_entry : styles.page_entry}>
                { !!Icon && <div> <Icon /> </div> }
                <div>{ title(name) }</div>
            </div>
        </Link>
    )
}

const Layout = ({ children }) => {
    const router = useRouter();
    const { entity } = router.query;
    const [ selectedEntity, setSelectedEntity ] = useState(entity);

    useEffect(() => {
        setSelectedEntity(entity);
    }, [entity]);

    return (
        <Grid container spacing={2} className={styles.layout}>
            <Grid item xl={3} className={styles.layout_page_column}>
                <PageEntry url="/" name="Dashboard" Icon={DashboardIcon} />
                <Divider />
                {Object.entries(entities).map(([name, { Icon }], index) =>
                    <PageEntry key={index}
                               url={`/${name}`}
                               name={pluralize(name)}
                               Icon={Icon}
                               selected={selectedEntity === name} />
                )}
            </Grid>
            <Grid item xl={9} className={styles.layout_content_column}>
                {children}
            </Grid>
        </Grid>
    )
};

export default Layout;