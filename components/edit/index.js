import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
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

    const formState = Object.fromEntries(
        [ ...fields, "id" ].map(field => {
            const [ value, setValue ] = useState(data[field]);
            return [field, { value, setValue }];
        })
    );

    const handleSubmit = async ($event) => {
        $event.preventDefault();
        const body = Object.fromEntries(fields.map(field => [field, formState[field].value]));
        fetch(`/api/${entity}/${formState["id"].value}`, {
            method: "PUT", body: JSON.stringify(body)
        });
        router.push(`/${entity}`);
    }

    return (
        <>
            <h2 className="page_title">Editing {entity}</h2>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                {fieldRegroup(fields).map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {group.map(name => (
                            <TextField key={name}
                                       label={name}
                                       required
                                       disabled={name === "id"}
                                       defaultValue={formState[name].value}
                                       onChange={event => formState[name].setValue(event.target.value)} />
                        ))}
                    </div>
                ))}
                {!fields.includes("id") &&
                    <input type="hidden" name="id" value={data.id} />
                }
                <div style={{padding: "10px"}}>
                    <Stack spacing={2} direction="row">
                        <Button variant="text" color="error" onClick={() => router.push(`/${entity}`)}>Cancel</Button>
                        <Button variant="contained" type="submit">Submit</Button>
                    </Stack>
                </div>
            </Box>
        </>
    )
}

export default Edit;