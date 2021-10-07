import styles from "./layout.module.css";

import Link from "next/link";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LanguageIcon from '@mui/icons-material/Language';
import MovieIcon from '@mui/icons-material/Movie';

const PageEntry = ({ url, name, Icon }) => {
    return (
        <Link href={url}>
            <div className={styles.page_entry}>
                { !!Icon && <div> <Icon /> </div> }
                <div>{ name }</div>
            </div>
        </Link>
    )
}

const Layout = ({ children }) => {
    const pages = [
        { url: "/categories", name: "Categories", Icon: CategoryIcon },
        { url: "/films", name: "Films", Icon: MovieIcon },
        { url: "/languages", name: "Languages", Icon: LanguageIcon }
    ];
    return (
        <Grid container spacing={2} className={styles.layout}>
            <Grid item xl={3} className={styles.layout_page_column}>
                <PageEntry url="/" name="Dashboard" Icon={DashboardIcon} />
                <Divider />
                {pages.map((page, index) =>
                    <PageEntry key={index} {...page} />
                )}
            </Grid>
            <Grid item xl={9} className={styles.layout_content_column}>
                {children}
            </Grid>
        </Grid>
    )
};

export default Layout;