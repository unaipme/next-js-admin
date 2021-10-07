import { useRouter } from "next/router";
import { Button, Stack, TextField, Box } from "@mui/material";

const fieldRegroup = (arr, size = 2) => {
    const ret = [];
    for (let i = 0; i < arr.length; i += size) {
        ret.push(arr.slice(i, i + size));
    }
    return ret;
}

const Edit = ({ fields, entity, data }) => {
    const router = useRouter();
    return (
        <>
            <h2 className="page_title">Editing {entity}</h2>
            <Box component="form" noValidate autoComplete="off" sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                {fieldRegroup(fields).map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {group.map(name => (
                            <TextField key={name} label={name} required defaultValue={data[name]} />
                        ))}
                    </div>
                ))}
                <div style={{padding: "10px"}}>
                    <Stack spacing={2} direction="row">
                        <Button variant="text" color="error" onClick={() => router.push(`/${entity}`)}>Cancel</Button>
                        <Button variant="contained" disabled>Submit</Button>
                    </Stack>
                </div>
            </Box>
        </>
    )
}

export default Edit;