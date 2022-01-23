import React, { ChangeEvent, useState } from "react"

export const useForm = <T extends Object> (initState: T) => {
    const [form, setForm] = useState(initState);

    const _handleChange = ({ target }: React.FormEvent<HTMLElement | HTMLInputElement>) => {
        const { name, value } = target as HTMLInputElement;

        setForm(
            {
                ...form,
                [name]: value
            }
        )
    }

    return {
        form,
        ...form,
        _handleChange
    }
}