import React from 'react';

import { Button, Stack, StackProps, Typography } from '@mui/material';

import { palette } from '@/themes';

interface LabelAndSelectFileProps extends StackProps {
    labelValue: string;
    fileName: string;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
const LabelAndSelectFile: React.FC<LabelAndSelectFileProps> = ({
    fileName,
    labelValue,
    setFile,
}) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };
    return (
        <Stack sx={{ gap: '12px' }}>
            <Typography sx={{ fontSize: '14px' }}>{labelValue}</Typography>
            <Stack direction={'row'} gap="10px" sx={{ alignItems: 'center' }}>
                <Typography
                    sx={{
                        width: '500px',
                        padding: '10px 12px',
                        height: '44px',
                        color: palette.grey[400],
                        background: palette.grey[50],
                        borderRadius: '4px',
                    }}
                >
                    {fileName}
                </Typography>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <Button
                    variant="containedWhite"
                    onClick={handleClick}
                    sx={{
                        height: '30px',
                        width: '84px',
                        fontSize: '14px',
                        whiteSpace: 'noWrap',
                    }}
                >
                    파일 첨부
                </Button>
            </Stack>
        </Stack>
    );
};

export default LabelAndSelectFile;
