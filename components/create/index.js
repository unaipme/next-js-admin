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

const Create = ({ fields, entity }) => {
    const router = useRouter();
    const formFields = fields.filter(field => field !== "id");

    const formState = Object.fromEntries(
        formFields.map(field => {
            const [ value, setValue ] = useState("");
            return [field, { value, setValue }];
        })
    );

    const handleSubmit = async ($event) => {
        $event.preventDefault();
        const body = Object.fromEntries(formFields.map(field => [field, formState[field].value]));
        mutate(
            `/api/${entity}`,
            async () => {
                await fetch(`/api/${entity}`, {
                    method: "POST", body: JSON.stringify(body)
                });
                router.push(`/${entity}`);
            }
        );
    }

    return (
        <>
            <h2 className="page_title">Creating {entity}</h2>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                {fieldRegroup(formFields).map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {group.map(name => (
                            <TextField key={name}
                                       label={name}
                                       required
                                       defaultValue={formState[name].value}
                                       onChange={event => formState[name].setValue(event.target.value)} />
                        ))}
                    </div>
                ))}
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

export default Create;