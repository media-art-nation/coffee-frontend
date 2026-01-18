import React, { useState } from 'react';

import { Button, IconButton, Stack } from '@mui/material';
import { Plus, Trash } from '@phosphor-icons/react';

import { palette } from '@/themes';
import { GcsDirectoryEnum } from '@/typings/Gcs';
import { usePostGcsFile } from '@/apis/Gcs/usePostGcsFile';

type AddPhotoWithGcsProps = {
    value: string | null;
    onChange: (value: string | null) => void;
    directory: GcsDirectoryEnum;
};

const AddPhotoWithGcs = ({
    value,
    onChange,
    directory,
}: AddPhotoWithGcsProps) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const { mutateAsync: postGcsFile } = usePostGcsFile();

    const [inputValue, setInputValue] = useState<string | null>(value);


    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const response = await postGcsFile({ file, directory });
        if (response.data.code === 'SUCCESS') {
          onChange(response.data.response);
          setInputValue(response.data.response);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
    
      const handleDelete = () => {
        setInputValue(null);
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      };

    return (
        <Stack direction="row" gap="10px" alignItems="end">
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
                {inputValue ? (
                    <img
                        src={inputValue}
                        alt="current image"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onClick={handleClick}
                    />
                )
                    : (
                        <IconButton onClick={handleClick}>
                            <Plus />
                        </IconButton>
                    )}
            </Stack>
            {value && <Button size="small" variant="outlinedRed" sx={{ padding: '5px 10px' }} onClick={handleDelete}>삭제</Button>}
        </Stack>
    );
};

export default AddPhotoWithGcs;
