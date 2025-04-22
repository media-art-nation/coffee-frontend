import React from 'react';

import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { Button, Stack, StackProps, Typography } from '@mui/material';

import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import { palette } from '@/themes';

type LabelAndSelectFileProps<T extends FieldValues> = StackProps & {
    labelValue: string;
    fieldName: Path<T>;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
};
const LabelAndSelectFile = <T extends FieldValues>({
    labelValue,
    fieldName,
    watch,
    setValue,
    ...props
}: LabelAndSelectFileProps<T>) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const file: File | null = watch(fieldName) as File | null;

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
        <LabelComponentsLayout {...props} labelValue={labelValue} sx={{ ...props.sx }}>
            <Stack direction={'row'} gap="10px" sx={{ alignItems: 'center' }}>
                <Typography
                    sx={{
                        padding: '10px 12px',
                        height: '44px',
                        color: palette.grey[400],
                        background: palette.grey[50],
                        borderRadius: '4px',
                    }}
                >
                    {file ? file.name : '선택된 파일 없음'}
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
        </LabelComponentsLayout>
    );
};

export default LabelAndSelectFile;
