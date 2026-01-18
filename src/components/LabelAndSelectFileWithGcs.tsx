import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Stack, StackProps, Typography } from '@mui/material';

import LabelComponentsLayout from '@/components/LabelComponentsLayout';
import { palette } from '@/themes';
import { GcsDirectoryEnum } from '@/typings/Gcs';
import { usePostGcsFile } from '@/apis/Gcs/usePostGcsFile';

type LabelAndSelectFileWithGcsProps = StackProps & {
    inputAccept?: string;
    directory: GcsDirectoryEnum;
    value: string | null;
    onChange: (value: string | null) => void;
    labelValue: string;
};
const LabelAndSelectFileWithGcs = ({
    directory,
    value,
    onChange,
    labelValue,
    inputAccept = 'image/*',
}: LabelAndSelectFileWithGcsProps) => {
    const { t } = useTranslation();
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const { mutateAsync: postGcsFile } = usePostGcsFile();
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const response = await postGcsFile({ file, directory });
            if (response.data.code === 'SUCCESS') {
                onChange(response.data.response);
            }
        }
    };

    const handleClickDelete = () => {
        onChange(null);
    };

    return (
        <LabelComponentsLayout labelValue={labelValue}>
            <Stack direction={'row'} gap="10px" sx={{ alignItems: 'center', width: '100%' }}>
                {/* 한줄 넘어가면 말줄임 ... 처리 */}
                <Stack sx={{ flex: 1, height: '56px', justifyContent: 'center', border: `1px solid ${palette.grey[300]}`, borderRadius: '10px', px: '14px', minWidth: '0' }}>
                    <Typography sx={{ padding: 'auto 12px', color: palette.grey[400], fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {value ? value : t('선택된 파일 없음')}
                    </Typography>
                </Stack>
                <input
                    type="file"
                    accept={inputAccept}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {value ? <Button
                    variant="outlinedRed"
                    onClick={handleClickDelete}
                    sx={{
                        height: '40px',
                        width: '84px',
                        fontSize: '14px',
                        whiteSpace: 'noWrap',
                    }}
                >
                    {t('삭제')}
                </Button> : <Button
                    variant="containedWhite"
                    onClick={handleClick}
                    sx={{
                        height: '40px',
                        width: '84px',
                        fontSize: '14px',
                        whiteSpace: 'noWrap',
                    }}
                >
                    {t('파일 첨부')}
                </Button>
                }
            </Stack>
        </LabelComponentsLayout>
    );
};

export default LabelAndSelectFileWithGcs;
