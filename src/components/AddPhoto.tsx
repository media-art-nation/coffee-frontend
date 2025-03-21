import React from 'react';

import { IconButton, Stack } from '@mui/material';
import { Plus } from '@phosphor-icons/react';

import { palette } from '@/themes';

const AddPhoto = () => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            console.log('이미지 URL:', imageUrl);
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
