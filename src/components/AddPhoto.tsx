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
const AddPhoto = <T extends FieldValues>({
    fieldName,
    watch,
    setValue,
}: AddPhotoProps<T>) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const value = watch(fieldName) as File | string | null;
    const previewUrl = React.useMemo(() => {
        if (value instanceof File) {
            return URL.createObjectURL(value); // 새로 업로드된 파일
        }
        return null;
    }, [value]);

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
                backgroundColor: palette.grey[50],
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
            {typeof value === 'string' ? (
                <img
                    src={value}
                    alt="current image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onClick={handleClick}
                />
            ) : previewUrl ? (
                <img
                    src={previewUrl}
                    alt="preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onClick={handleClick}
                />
            ) : (
                <IconButton onClick={handleClick}>
                    <Plus />
                </IconButton>
            )}
        </Stack>
    );
};

export default AddPhoto;
