import CategoryIcon from '@mui/icons-material/Category';
import LanguageIcon from '@mui/icons-material/Language';
import MovieIcon from '@mui/icons-material/Movie';

const entities = {
    language: {
        fields: ["id", "name", "last_update"],
        Icon: LanguageIcon
    },
    film: {
        fields: ["id", "title", "description", "release_year", "language_id", "rental_duration", "rental_rate"],
        Icon: MovieIcon
    },
    category: {
        fields: ["name"],
        Icon: CategoryIcon
    }
};

export default entities;