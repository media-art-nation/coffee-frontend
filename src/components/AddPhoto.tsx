import React from 'react';

import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { IconButton, Stack } from '@mui/material';
import { Plus } from '@phosphor-icons/react';

import { palette } from '@/themes';

type AddPhotoProps<T extends FieldValues> = {
    fieldName: Path<T>;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
};
const AddPhoto = <T extends FieldValues>({ fieldName, setValue }: AddPhotoProps<T>) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    // const file: File | null = watch(fieldName) as File | null;

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue(fieldName, file as PathValue<T, Path<T>>);
        }
    };
    return (
        <Stack
            sx={{
                backgroundColor: palette.grey[100],
                width: '120px',
                height: '160px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <IconButton onClick={handleClick}>
                <Plus />
            </IconButton>
        </Stack>
    );
};

export default AddPhoto;
